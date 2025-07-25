# Configuración de formulario de contacto

## OPCIÓN RECOMENDADA: SMTP de Google + Backend

### Ventajas del SMTP:
- ✅ Más confiable y profesional
- ✅ Sin límites de 200 emails/mes
- ✅ Control total sobre el proceso
- ✅ Mejor deliverability
- ✅ No depende de servicios externos

### Configuración SMTP:
1. **Habilitar autenticación de 2 factores** en Gmail para yerko@zerogap.cl
2. **Generar contraseña de aplicación**:
   - Gmail > Configuración > Seguridad
   - "Contraseñas de aplicaciones"
   - Genera una para "Correo"
3. **Crear backend** (Node.js con Nodemailer)
4. **Configurar SMTP**:
   - Host: smtp.gmail.com
   - Puerto: 587 (TLS)
   - Usuario: yerko@zerogap.cl
   - Contraseña: [contraseña de aplicación generada]

### Configuración implementada:

1. **Backend con Nodemailer**:
```javascript
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'yerko@zerogap.cl',
    pass: process.env.GMAIL_APP_PASSWORD
  }
});
```

2. **Configurar Gmail (OBLIGATORIO para yerko@zerogap.cl)**:

   - Habilitar autenticación de 2 factores en Gmail
   - Generar contraseña de aplicación en Gmail > Configuración > Seguridad
   - Configurar variable de entorno:

```bash
# En Heroku:
heroku config:set GMAIL_APP_PASSWORD=tu_contraseña_de_aplicacion

# En desarrollo local, crear archivo .env:
GMAIL_APP_PASSWORD=tu_contraseña_de_aplicacion
```

3. **Para deployar**:
```bash
npm install
heroku config:set GMAIL_APP_PASSWORD=tu_contraseña_aqui
git push heroku main
```

### Características implementadas:
- ✅ Envío desde yerko@zerogap.cl
- ✅ Recepción en yerko@zerogap.cl
- ✅ Fallback automático a mailto
- ✅ Opción adicional de WhatsApp
- ✅ Validación frontend y backend
- ✅ Formato HTML profesional del email

---

## ALTERNATIVA: EmailJS (ya no necesario)

### 1. Crear cuenta en EmailJS
1. Ve a https://www.emailjs.com/
2. Registrate con tu email `contacto@zerogap.cl`
3. Verifica tu email

### 2. Conectar tu cuenta de Gmail
1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz click en "Add New Service"
3. Selecciona "Gmail"
4. Autoriza EmailJS para usar tu cuenta de Gmail
5. Anota el SERVICE_ID que se genera

### 3. Crear template de email
1. Ve a "Email Templates"
2. Haz click en "Create New Template"
3. Usa este template:

```
Asunto: Nuevo mensaje desde Zerogap.cl - {{subject}}

Has recibido un nuevo mensaje de contacto desde zerogap.cl

Detalles del contacto:
- Nombre: {{from_name}}
- Empresa: {{company}}
- Email: {{reply_to}}
- Teléfono: {{phone}}
- Sector: {{sector}}

Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto de zerogap.cl
```

4. Anota el TEMPLATE_ID que se genera

### 4. Obtener clave pública
1. Ve a "Account" > "General"
2. Copia tu "Public Key"

### 5. Actualizar el código
En contact.html, reemplaza:
- `YOUR_PUBLIC_KEY` con tu clave pública
- `YOUR_SERVICE_ID` con tu service ID
- `YOUR_TEMPLATE_ID` con tu template ID

### 6. Configuración actual del código:
```javascript
// Estos valores deben ser actualizados con los de tu cuenta
emailjs.init("YOUR_PUBLIC_KEY");
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

### Plan gratuito de EmailJS:
- ✅ 200 emails por mes
- ✅ Integración con Gmail
- ✅ Templates personalizables
- ✅ Anti-spam integrado
