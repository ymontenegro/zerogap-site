const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración SMTP de Gmail
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'yerko@zerogap.cl',
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
      connectSrc: ["'self'"]
    }
  }
}));

// Compresión GZIP
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname), {
  maxAge: '1y', // Cache por 1 año para assets estáticos
  etag: true
}));

// Configurar tipos MIME
app.use((req, res, next) => {
  if (req.path.endsWith('.css')) {
    res.type('text/css');
  } else if (req.path.endsWith('.js')) {
    res.type('application/javascript');
  }
  next();
});

// Rutas para las páginas
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

// Redirigir todas las rutas no encontradas al index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint para formulario de contacto
app.post('/send-contact', async (req, res) => {
  try {
    const { from_name, company, reply_to, phone, sector, subject, message } = req.body;

    // Validar campos requeridos
    if (!from_name || !reply_to || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Faltan campos obligatorios' 
      });
    }

    // Configurar el email
    const mailOptions = {
      from: 'yerko@zerogap.cl',
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

    // Enviar el email
    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, message: 'Email enviado correctamente' });
    
  } catch (error) {
    console.error('Error enviando email:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error interno del servidor' 
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Zerogap site running on port ${PORT}`);
  console.log(`📱 Local: http://localhost:${PORT}`);
});

module.exports = app;
