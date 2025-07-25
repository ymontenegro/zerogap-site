const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Zerogap site running on port ${PORT}`);
  console.log(`📱 Local: http://localhost:${PORT}`);
});

module.exports = app;
