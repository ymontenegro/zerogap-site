# 🚀 Guía Rápida - Nuevo Diseño Zerogap

## ✅ ¿Qué se ha actualizado?

### Página Principal (index.html)
- ✨ Hero section premium con animaciones
- ✨ Header con glassmorphism
- ✨ Cards modernizadas
- ✨ Footer dark mode
- ✨ Scroll progress bar
- ✨ Animaciones on scroll

### Archivos CSS
- `style.css` - Sistema de diseño completo
- `animations.css` - Animaciones y efectos (NUEVO)

## 🎨 Usar el Nuevo Sistema

### 1. Colores (Variables CSS)

```css
/* En tu CSS o inline styles */
color: var(--primary-color);        /* Azul eléctrico */
background: var(--dark-900);        /* Negro moderno */
color: var(--text-secondary);       /* Gris texto */

/* Gradientes */
background: var(--gradient-primary);
background: var(--gradient-dark);
```

### 2. Espaciado

```css
/* Usar variables de espaciado */
padding: var(--space-lg);           /* 48px */
margin: var(--space-xl);            /* 80px */
gap: var(--space-md);               /* 24px */
```

### 3. Sombras

```css
/* Niveles de sombra */
box-shadow: var(--shadow-sm);       /* Sutil */
box-shadow: var(--shadow-md);       /* Media */
box-shadow: var(--shadow-lg);       /* Grande */
box-shadow: var(--shadow-xl);       /* Extra grande */
```

### 4. Border Radius

```css
border-radius: var(--radius-sm);    /* 8px */
border-radius: var(--radius-md);    /* 12px */
border-radius: var(--radius-lg);    /* 20px */
border-radius: var(--radius-xl);    /* 32px */
```

### 5. Transiciones

```css
transition: all var(--transition-fast);   /* 0.15s */
transition: all var(--transition-base);   /* 0.3s */
transition: all var(--transition-slow);   /* 0.5s */
```

## 🎯 Clases Útiles

### Botones

```html
<!-- Botón blanco con hover azul -->
<a href="#" class="btn">
  <span>Texto del botón</span>
</a>

<!-- Botón azul directo -->
<a href="#" class="btn btn-primary">
  <span>Texto del botón</span>
</a>
```

### Animaciones

```html
<!-- Elemento que aparece al hacer scroll -->
<section class="reveal">
  Contenido
</section>

<!-- Con delay -->
<div class="reveal reveal-delay-1">Item 1</div>
<div class="reveal reveal-delay-2">Item 2</div>
<div class="reveal reveal-delay-3">Item 3</div>

<!-- Gradiente animado en texto -->
<h1 class="animated-gradient-text">Título</h1>

<!-- Blur reveal -->
<div class="blur-reveal">Contenido</div>

<!-- Flotante -->
<div class="float">Elemento</div>
```

### Cards

```html
<!-- Card moderna con hover effects -->
<div class="card scale-hover">
  <img src="imagen.jpg" alt="Descripción">
  <h3>Título</h3>
  <p>Descripción</p>
</div>
```

## 📱 Responsive

El diseño es automáticamente responsive. En móvil:
- Grid se convierte en 1 columna
- Botones se hacen full-width
- Espaciado se reduce
- Parallax se desactiva

## 🔧 Personalización Rápida

### Cambiar Color Principal

En `style.css`, línea ~14:
```css
--primary-color: #0066FF;  /* Cambiar aquí */
```

### Cambiar Tipografía

En `style.css`, línea ~67:
```css
@import url('https://fonts.googleapis.com/...');
```

### Agregar Nueva Sección

```html
<section id="mi-seccion" class="reveal">
  <div class="container">
    <h2>Mi Título</h2>
    <div class="card-container">
      <!-- Cards aquí -->
    </div>
  </div>
</section>
```

## 🎨 Efectos Premium

### Glow Effect

```html
<div class="glow-on-hover">
  Contenido con glow
</div>
```

### Shimmer Effect

```html
<div class="shimmer-effect">
  Contenido con shimmer
</div>
```

### Slide Animations

```html
<div class="slide-in-left">Desde izquierda</div>
<div class="slide-in-right">Desde derecha</div>
```

## 🚀 Próximos Pasos

### Para Aplicar a Otras Páginas

1. Copiar header y footer de index.html
2. Agregar `<link rel="stylesheet" href="animations.css">`
3. Usar clases de sistema de diseño
4. Aplicar `reveal` a secciones

### Páginas Pendientes
- [ ] about.html
- [ ] what-we-do.html
- [ ] success-cases.html
- [ ] contact.html
- [ ] asicam.html

## 📊 Testing

### Verificar en:
- Chrome DevTools (Desktop + Mobile)
- Safari (Mac/iOS)
- Firefox
- Edge

### Checklist
- [ ] Scroll suave
- [ ] Animaciones funcionan
- [ ] Responsive correcto
- [ ] Performance > 90 (Lighthouse)
- [ ] No errores en consola

## 💡 Tips

1. **Usar DevTools**: Inspeccionar para ver variables CSS
2. **Copiar clases**: De index.html como referencia
3. **Sistema de grid**: `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`
4. **Hover states**: Siempre agregar transiciones

## 🆘 Solución de Problemas

### Las animaciones no funcionan
- Verificar que `animations.css` esté cargado
- Comprobar consola de errores
- Verificar clase `reveal` aplicada

### Colores no se ven
- Verificar variables CSS en `:root`
- Limpiar caché del navegador
- Usar `var(--nombre-variable)`

### Responsive no funciona
- Verificar viewport meta tag
- Comprobar media queries
- Usar DevTools responsive mode

## 📚 Recursos

- Variables CSS: `style.css` líneas 12-64
- Animaciones: `animations.css`
- Ejemplos: `index.html`
- Docs: `MODERNIZATION.md`

---

**¿Dudas?** Revisar `MODERNIZATION.md` para documentación completa

**Ver cambios**: `BEFORE_AFTER.md`

**Changelog**: `CHANGELOG.md`
