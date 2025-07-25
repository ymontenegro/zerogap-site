# Configuración de EmailJS para formulario de contacto

## Pasos para configurar EmailJS con Gmail:

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
