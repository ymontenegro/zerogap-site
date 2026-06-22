// Cargar variables de entorno en desarrollo
if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').config();
  } catch (err) {
    console.log('⚠️  dotenv no disponible, usando variables del sistema');
  }
}

const express = require('express');
const path = require('path');
const fs = require('fs');
const compression = require('compression');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Detrás del proxy de Coolify/Hetzner: confiar en X-Forwarded-* para host/protocolo.
app.set('trust proxy', true);

// Consolidación de dominio: redirige www.* -> apex (zerogap.cl) con 301.
// Antes www.zerogap.cl y zerogap.cl servían ambos con 200 (contenido duplicado);
// esto unifica todo en el host canónico y evita diluir la autoridad.
app.use((req, res, next) => {
  const host = req.headers.host || '';
  if (host.toLowerCase().startsWith('www.')) {
    return res.redirect(301, 'https://' + host.slice(4) + req.originalUrl);
  }
  next();
});

// --- Componentes compartidos (header/footer) para inyección server-side ---
// Los crawlers de buscadores y, sobre todo, los de IA (GPTBot, PerplexityBot,
// ClaudeBot, Google-Extended) en su mayoría NO ejecutan JavaScript. Si el
// header/footer se cargan sólo en el cliente, esos bots ven páginas sin
// navegación ni enlaces internos. Por eso los inyectamos en el servidor.
function loadComponent(name) {
  try {
    return fs.readFileSync(path.join(__dirname, 'components', name), 'utf8').trim();
  } catch (err) {
    console.error('⚠️  No se pudo cargar el componente', name, '-', err.message);
    return '';
  }
}

let cachedHeader = loadComponent('header.html');
let cachedFooter = loadComponent('footer.html');
// En producción cacheamos; en desarrollo recargamos para ver cambios sin reiniciar.
const getHeader = () => (isProd ? cachedHeader : loadComponent('header.html'));
const getFooter = () => (isProd ? cachedFooter : loadComponent('footer.html'));

// Sirve una página HTML reemplazando los placeholders por el header/footer reales.
function renderPage(res, filename, status = 200) {
  fs.readFile(path.join(__dirname, filename), 'utf8', (err, html) => {
    if (err) {
      console.error('⚠️  No se pudo leer la página', filename, '-', err.message);
      return res.status(404).type('html').send('<h1>404 — Página no encontrada</h1>');
    }
    const out = html
      .replace('<div id="header-placeholder"></div>', getHeader())
      .replace('<div id="footer-placeholder"></div>', getFooter());
    res.status(status).type('html').send(out);
  });
}

// Configuración SMTP de Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'yerko@zerogap.cl',
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

// Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "https://zerogap-site-937e31a4f419.herokuapp.com", "https://*.herokuapp.com"]
    }
  }
}));

// Middleware básico
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Páginas HTML con header/footer inyectados server-side ---
// Se interceptan ANTES de express.static para que el HTML entregado a
// crawlers incluya navegación y enlaces internos.
app.get('/', (req, res) => renderPage(res, 'index.html'));
app.get(/\.html$/, (req, res) => renderPage(res, path.basename(req.path)));

// Servir archivos estáticos (CSS, JS, imágenes, robots.txt, sitemap.xml)
app.use(express.static(path.join(__dirname), {
  index: false,
  maxAge: '1d',
  etag: true,
  setHeaders: function (res, filePath, stat) {
    res.set('Cache-Control', 'public, max-age=86400');

    if (filePath.endsWith('.css')) {
      res.set('Content-Type', 'text/css; charset=utf-8');
    }
    if (filePath.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript; charset=utf-8');
    }
    if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      res.set('Content-Type', 'image/' + filePath.split('.').pop());
    }
  }
}));

// Endpoint para formulario de contacto
app.post('/send-contact', async (req, res) => {
  try {
    console.log('📧 Recibida solicitud de contacto:', req.body);
    
    const { from_name, company, reply_to, phone, sector, subject, message } = req.body;

    if (!from_name || !reply_to || !subject || !message) {
      console.log('❌ Faltan campos obligatorios');
      return res.status(400).json({ 
        success: false, 
        error: 'Faltan campos obligatorios' 
      });
    }

    if (!process.env.GMAIL_APP_PASSWORD) {
      console.error('❌ GMAIL_APP_PASSWORD no está configurado');
      return res.status(500).json({ 
        success: false, 
        error: 'Configuración de email incompleta' 
      });
    }

    try {
      await transporter.verify();
      console.log('✅ Conexión SMTP verificada');
    } catch (verifyError) {
      console.error('❌ Error de verificación SMTP:', verifyError);
      return res.status(500).json({ 
        success: false, 
        error: 'Error de configuración SMTP: ' + verifyError.message 
      });
    }

    const mailOptions = {
      from: process.env.GMAIL_USER || 'yerko@zerogap.cl',
      to: 'yerko@zerogap.cl',
      subject: `Nuevo mensaje desde Zerogap.cl - ${subject}`,
      html: `
        <h2>Nuevo mensaje de contacto desde zerogap.cl</h2>
        
        <h3>Detalles del contacto:</h3>
        <ul>
          <li><strong>Nombre:</strong> ${from_name}</li>
          <li><strong>Empresa:</strong> ${company || 'No especificada'}</li>
          <li><strong>Email:</strong> ${reply_to}</li>
          <li><strong>Teléfono:</strong> ${phone || 'No especificado'}</li>
          <li><strong>Sector:</strong> ${sector || 'No especificado'}</li>
        </ul>
        
        <h3>Asunto:</h3>
        <p><strong>${subject}</strong></p>
        
        <h3>Mensaje:</h3>
        <p style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #0b5ed7;">
          ${message.replace(/\n/g, '<br>')}
        </p>
        
        <hr>
        <p style="color: #666; font-size: 12px;">
          Este mensaje fue enviado desde el formulario de contacto de zerogap.cl
        </p>
      `,
      replyTo: reply_to
    };

    console.log('📬 Enviando email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado correctamente:', info.messageId);
    
    res.json({ success: true, message: 'Email enviado correctamente' });
    
  } catch (error) {
    console.error('❌ Error enviando email:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor: ' + error.message 
    });
  }
});

// Rutas limpias (sin .html) para cualquier página existente.
// Ej: /asicam -> asicam.html, /optimizacion-de-flota -> optimizacion-de-flota.html
app.get('/:page', (req, res, next) => {
  const page = req.params.page;
  if (page.includes('.')) return next();
  const candidate = path.join(__dirname, page + '.html');
  fs.access(candidate, fs.constants.R_OK, (err) => {
    if (err) return next();
    renderPage(res, page + '.html');
  });
});

// 404 real (antes devolvía index.html con status 200 → soft 404, malo para SEO)
app.use((req, res) => {
  renderPage(res, '404.html', 404);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Zerogap site running on port ${PORT}`);
  console.log(`📱 Local: http://localhost:${PORT}`);
});

module.exports = app;
