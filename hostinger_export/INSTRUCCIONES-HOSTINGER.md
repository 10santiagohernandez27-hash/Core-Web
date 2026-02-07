# Instrucciones de Migración a Hostinger

## Estructura de Archivos

```
/public_html/
├── index.html
├── .htaccess
├── css/
│   └── styles.css
├── js/
│   └── script.js
└── images/
    ├── Logo-Png.png
    ├── core-hero-ecosistema.png
    ├── core-web-conversion-turismo.png
    ├── core-app-pedidos-cafe.png
    ├── core-wallet-card-barberia.png
    └── core-reservas-restaurante.png
```

## Pasos de Instalación

### 1. Accede al File Manager de Hostinger
- Panel de Hostinger → File Manager
- Navega a `/public_html/`

### 2. Sube los archivos
- Sube `index.html` y `.htaccess` en la raíz de `/public_html/`
- Crea la carpeta `css/` y sube `styles.css`
- Crea la carpeta `js/` y sube `script.js`
- Crea la carpeta `images/` y sube las 6 imágenes

### 3. Descarga las imágenes
Las imágenes están alojadas en estas URLs (haz clic derecho → Guardar como):

- **Logo**: https://customer-assets.emergentagent.com/job_digital-core-2/artifacts/s5rv5qa9_Logo%20Png.png → Guardar como `Logo-Png.png`
- **Hero**: https://customer-assets.emergentagent.com/job_digital-core-2/artifacts/0zjrzd1z_core-hero-ecosistema.png → Guardar como `core-hero-ecosistema.png`
- **Web Turismo**: https://customer-assets.emergentagent.com/job_digital-core-2/artifacts/a4h57mz8_core-web-conversion-turismo.png → Guardar como `core-web-conversion-turismo.png`
- **App Café**: https://customer-assets.emergentagent.com/job_digital-core-2/artifacts/6jnib4nq_core-app-pedidos-cafe.png → Guardar como `core-app-pedidos-cafe.png`
- **Wallet Barbería**: https://customer-assets.emergentagent.com/job_digital-core-2/artifacts/dsdjqogp_core-wallet-card-barberia.png → Guardar como `core-wallet-card-barberia.png`
- **Reservas Restaurante**: https://customer-assets.emergentagent.com/job_digital-core-2/artifacts/hxktcaqi_core-reservas-restaurante.png → Guardar como `core-reservas-restaurante.png`

### 4. Verificación
- Abre tu dominio en el navegador
- Comprueba que todas las imágenes carguen correctamente
- Verifica el slider en móvil (swipe con el dedo)
- Prueba el formulario de contacto
- Confirma que el SSL esté activo (https://)

### 5. Formulario de contacto
El formulario actualmente es una simulación. Para conectarlo con email real:
- Opción A: Usa Formspree.io (gratuito) - cambia el `action` del form
- Opción B: Crea un script PHP en Hostinger para enviar emails
- Opción C: Integra con Mailchimp, HubSpot o similar

## Notas
- Las fuentes (DM Sans) se cargan desde Google Fonts CDN
- El .htaccess configura HTTPS, caché y compresión automática
- Todas las rutas de imágenes son relativas (`images/archivo.png`)
