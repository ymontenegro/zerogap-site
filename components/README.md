# Componentes Reutilizables Zerogap

Esta carpeta contiene componentes HTML y JavaScript reutilizables para mantener consistencia en todas las páginas del sitio.

## Estructura

```
components/
├── header.html              # Header con navegación estándar
├── footer.html              # Footer con información de contacto
├── mobile-menu-script.js    # Script del menú hamburguesa móvil
├── scroll-effects.js        # Efectos de scroll y animaciones
└── README.md               # Esta documentación
```

## Uso en Páginas HTML

### 1. Header
El header debe incluirse al inicio del `<body>`:

```html
<body>
  <div class="scroll-progress" id="scrollProgress"></div>

  <!-- Header común -->
  <header>
    <div class="nav-container">
      <a href="index.html" class="logo"><img src="images/logo.png" alt="Logotipo Zerogap"></a>

      <div class="menu-toggle" id="menuToggle">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav id="navMenu">
        <a href="what-we-do.html">Qué hacemos</a>
        <a href="success-cases.html">Casos de éxito</a>
        <a href="asicam.html" class="active">ASICAM</a> <!-- Añade class="active" a la página actual -->
        <a href="about.html">Acerca de</a>
        <a href="contact.html">Contacto</a>
      </nav>
    </div>

    <div class="menu-overlay" id="menuOverlay"></div>
  </header>
```

**Importante:** Añade `class="active"` al enlace de la página actual en la navegación.

### 2. Footer
El footer debe incluirse antes del cierre de `</body>`:

```html
  <footer>
    <div class="footer-container">
      <p>&copy; 2025 Zerogap. Todos los derechos reservados.</p>
      <p>Napoleón 3037, 71, Las Condes, Chile</p>
      <p>Josue Smith Solar 426, Providencia, Chile</p>
      <p><a href="https://wa.me/56939100549" target="_blank">WhatsApp</a> | <a href="mailto:contacto@zerogap.cl">contacto@zerogap.cl</a></p>
    </div>
  </footer>
```

### 3. Scripts
Al final del `<body>`, antes de `</body>`:

```html
  <!-- Scripts comunes -->
  <script src="components/scroll-effects.js"></script>
  <script src="components/mobile-menu-script.js"></script>
</body>
```

## Estructura Completa de una Página

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Título de la Página | Zerogap</title>
  <link rel="stylesheet" href="style.css">
  <!-- CSS adicionales si es necesario -->
</head>
<body>
  <div class="scroll-progress" id="scrollProgress"></div>

  <!-- Header común -->
  <header>
    <!-- Contenido del header aquí -->
  </header>

  <main>
    <!-- Contenido de la página -->
  </main>

  <!-- Footer común -->
  <footer>
    <!-- Contenido del footer aquí -->
  </footer>

  <!-- Scripts comunes -->
  <script src="components/scroll-effects.js"></script>
  <script src="components/mobile-menu-script.js"></script>
</body>
</html>
```

## Actualización de Componentes

Para actualizar el header o footer en todas las páginas:

1. Edita el archivo correspondiente en `components/`
2. Copia y pega el contenido actualizado en todas las páginas HTML
3. Asegúrate de mantener `class="active"` en el enlace correspondiente de cada página

## Notas

- **Consistencia**: Todas las páginas deben usar exactamente el mismo HTML para header y footer
- **Scripts**: Los scripts están separados para facilitar el mantenimiento
- **Estilos**: Los estilos de header y footer están en `style.css`
- **Responsive**: El menú hamburguesa se activa automáticamente en móviles

## Páginas Actuales

Todas estas páginas usan los componentes estandarizados:
- ✅ index.html
- ✅ asicam.html
- ✅ about.html
- ✅ contact.html
- ✅ success-cases.html
- ✅ what-we-do.html
