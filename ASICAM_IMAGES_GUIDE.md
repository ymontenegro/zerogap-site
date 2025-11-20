# Guía de Imágenes para ASICAM Landing Page

## Imágenes Necesarias

Para completar el nuevo landing de ASICAM, necesitas descargar las siguientes imágenes de alta calidad:

### 1. Hero Section - Imagen Principal
**Archivo:** `logistics-hero.jpg`
**Ubicación:** `/images/`
**Características:**
- Resolución mínima: 1920x1080px
- Temática: Camión moderno en carretera o autopista
- Estilo: Profesional, moderno, con buena iluminación
- Colores: Preferentemente con tonos azules o neutros que combinen con la paleta del sitio

**Recomendaciones de búsqueda en Unsplash/Pexels:**
- "modern truck highway sunset"
- "logistics truck motion blur"
- "semi truck on highway"
- "freight truck transportation"

**Ejemplos específicos de Unsplash (buscar estos términos):**
1. Busca: "blue truck highway" - Camiones modernos en autopistas
2. Busca: "logistics transportation" - Escenas de logística profesional
3. Busca: "container truck" - Camiones de carga moderna

---

### 2. Sección Primera Milla
**Archivo:** `first-mile-industrial.jpg`
**Ubicación:** `/images/`
**Características:**
- Resolución: 1200x800px mínimo
- Temática: Camiones en zona industrial, planta, o centro de distribución
- Debe mostrar: Operaciones de carga, ambiente industrial

**Búsqueda recomendada:**
- "warehouse trucks loading"
- "industrial logistics"
- "distribution center trucks"
- "cargo loading dock"

---

### 3. Sección Última Milla
**Archivo:** `last-mile-delivery.jpg`
**Ubicación:** `/images/`
**Características:**
- Resolución: 1200x800px mínimo
- Temática: Camiones de reparto en zona urbana
- Debe mostrar: Entrega urbana, camiones en ciudad

**Búsqueda recomendada:**
- "delivery truck city"
- "urban logistics"
- "last mile delivery"
- "truck in downtown"

---

### 4. Tecnología y Control (Opcional)
**Archivo:** `control-tower.jpg`
**Ubicación:** `/images/`
**Características:**
- Resolución: 1200x800px
- Temática: Centro de control, pantallas de monitoreo, tecnología
- Alternativa: Dashboard de computadora con mapas/rutas

**Búsqueda recomendada:**
- "logistics control center"
- "fleet management dashboard"
- "transportation technology"
- "route optimization screen"

---

## Fuentes Recomendadas (Gratuitas)

### 1. **Unsplash** (Primera opción - Sin atribución requerida)
- URL: https://unsplash.com
- Búsqueda: "logistics truck", "freight transport", "delivery truck"
- Licencia: Completamente gratis, uso comercial permitido

### 2. **Pexels** (Segunda opción - Excelente calidad)
- URL: https://www.pexels.com
- Búsqueda: "logistics", "truck transport", "cargo truck"
- Licencia: Gratis para uso comercial

### 3. **Pixabay** (Tercera opción)
- URL: https://pixabay.com
- Búsqueda: "logistics", "truck", "transportation"
- Licencia: Gratis, uso comercial permitido

---

## Pasos para Descargar

1. **Visita Unsplash.com**
2. **Busca:** "modern truck highway"
3. **Filtra por:** Orientación horizontal (landscape)
4. **Selecciona** una imagen profesional con buena composición
5. **Haz clic** en "Download free" (Botón verde)
6. **Renombra** el archivo según la guía arriba
7. **Guarda** en `/images/` del proyecto

---

## ✅ Imágenes Implementadas

Las siguientes imágenes han sido descargadas e integradas en el sitio:

### Imagen Principal del Hero
- **Archivo actual:** `sven-brandsma-YnSWpIPX3pE-unsplash.jpg` (3.6MB)
- **Ubicación:** Hero Section principal de ASICAM
- **Estado:** ✅ Implementada en `style.css` línea 3086
- **Descripción:** Camión moderno en carretera - perfecto para el mensaje del hero

### Imágenes Adicionales Disponibles
Las siguientes imágenes están listas para usar en futuras secciones:

1. **bernd-dittrich-x47XWbPWIk8-unsplash.jpg** (3.8MB)
   - Disponible para: Sección de Primera Milla o Tecnología

2. **marcin-jozwiak-kGoPcmpPT7c-unsplash.jpg** (5.1MB)
   - Disponible para: Logística industrial o transporte

3. **artem-balashevsky-ZhNYKwjRMh4-unsplash.jpg** (570KB)
   - Disponible para: Última Milla o distribución urbana

4. **pexels-elevate-1267325.jpg** (3.1MB)
   - Disponible para: Centro de control o tecnología

### Recomendación de Optimización

Algunas imágenes son bastante grandes. Recomiendo optimizarlas para web:

```bash
# Usando ImageMagick (si lo tienes instalado)
cd images/
for file in *unsplash*.jpg pexels*.jpg; do
  convert "$file" -resize 1920x1080^ -quality 85 "optimized-$file"
done
```

O usar herramientas online como:
- **TinyPNG:** https://tinypng.com (Reduce hasta 70% sin pérdida visual)
- **Squoosh:** https://squoosh.app (Control fino de calidad)

---

## Optimización de Imágenes

Después de descargar, optimiza las imágenes:

```bash
# Si tienes ImageMagick instalado:
convert original.jpg -resize 1920x1080 -quality 85 logistics-hero.jpg
```

O usa herramientas online:
- TinyPNG: https://tinypng.com
- Squoosh: https://squoosh.app

---

## Checklist de Implementación

- [ ] Descargar `logistics-hero.jpg` para Hero Section
- [ ] Descargar `first-mile-industrial.jpg` para sección Primera Milla
- [ ] Descargar `last-mile-delivery.jpg` para sección Última Milla
- [ ] (Opcional) Descargar `control-tower.jpg` para sección Tecnología
- [ ] Optimizar imágenes (reducir peso sin perder calidad)
- [ ] Colocar en carpeta `/images/`
- [ ] Verificar que se vean correctamente en el sitio web
- [ ] Probar en dispositivos móviles

---

**Última actualización:** Noviembre 2025
