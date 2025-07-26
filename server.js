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
const compression = require('compression');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Servir archivos estáticos
app.use(express.static(path.join(__dirname), {
  maxAge: '1d',
  etag: true,
  setHeaders: function (res, path, stat) {
    res.set('Cache-Control', 'public, max-age=86400');
    
    if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css; charset=utf-8');
    }
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript; charset=utf-8');
    }
    if (path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.jpeg')) {
      res.set('Content-Type', 'image/' + path.split('.').pop());
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

// Rutas para páginas específicas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/what-we-do', (req, res) => {
  res.sendFile(path.join(__dirname, 'what-we-do.html'));
});

app.get('/success-cases', (req, res) => {
  res.sendFile(path.join(__dirname, 'success-cases.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contact.html'));
});

// Catch-all para otras rutas
app.get('*', (req, res) => {
  if (req.path.includes('.')) {
    return res.status(404).send('Archivo no encontrado');
  }
  res.sendFile(path.join(__dirname, 'index.html'));
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
