# ⚽ Rolling Code Club Backend

Un backend desarrollado con Node.js y Express para una plataforma que combina el alquiler de canchas de fútbol con un e-commerce de productos relacionados al deporte, incluyendo gestión de roles de usuario.

## ✨ Descripción

Esta API proporciona servicios para:

- Gestión de usuarios con autenticación JWT
- Alquiler y administración de canchas de fútbol
- Sistema de reservas de turnos
- Comercio electrónico de productos deportivos
- Control de roles de usuario

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación basada en tokens
- **bcrypt** - Encriptación de contraseñas
- **Multer** - Manejo de archivos multimedia
- **Cloudinary** - Almacenamiento de imágenes en la nube
- **Express Validator** - Validación de datos
- **CORS** - Manejo de políticas de origen cruzado
- **Morgan** - Logging de peticiones HTTP

## 🏗️ Estructura del Proyecto

```
rollingCodeClubBackend/
├── db/
│   └── config.js          # Configuración de conexión a MongoDB
├── server/
│   └── config.js          # Configuración del servidor Express
├── src/
│   ├── controllers/       # Controladores de la aplicación
│   │   ├── usuario.controllers.js
│   │   ├── cancha.controllers.js
│   │   ├── turno.controllers.js
│   │   └── producto.controllers.js
│   ├── helpers/           # Funciones auxiliares
│   │   ├── cloudinary.js
│   │   ├── cloudinaryUploader.js
│   │   └── upload.js
│   ├── middleware/        # Middlewares personalizados
│   │   ├── validar*.js    # Validaciones
│   │   ├── verificarToken.js
│   │   ├── errorMulter.js
│   │   └── resultadoValidacion.js
│   ├── models/            # Modelos de datos
│   │   ├── usuario.js
│   │   ├── cancha.js
│   │   ├── turno.js
│   │   └── producto.js
│   └── routes/            # Definición de rutas API
│       ├── index.routes.js
│       ├── usuario.routes.js
│       ├── cancha.routes.js
│       ├── turno.routes.js
│       └── producto.routes.js
├── public/                # Archivos estáticos
├── .env                   # Variables de entorno
├── vercel.json            # Configuración de despliegue en Vercel
├── package.json           # Configuración de dependencias
└── index.js              # Punto de entrada de la aplicación
```

## 💻Instalación y Configuración

### Prerrequisitos

- Node.js v14 o superior
- MongoDB Atlas o instancia local de MongoDB
- Cuenta en Cloudinary (para almacenamiento de imágenes)

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/ximebarrientos/rollingCodeClubBackend.git
   cd rollingCodeClubBackend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```
   PORT=3000
   MONGODB=tu_cadena_de_conexion_mongodb
   SECRET_KEY=tu_clave_secreta_para_jwt
   CLOUD_NAME=tu_cloud_name_de_cloudinary
   API_KEY=tu_api_key_de_cloudinary
   API_SECRET=tu_api_secret_de_cloudinary
   MERCADOPAGO_ACCESS_TOKEN=your_mp_access_token_heretu_token_secreto_de_mp
   ```

4. Inicia el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

   O en modo producción:

   ```bash
   npm start
   ```

El servidor iniciará en `http://localhost:3000` por defecto.

## Endpoints de la API

[Mira la documentación aquí](https://documenter.getpostman.com/view/37059192/2sB3QRm6w2)

## Link del repositorio del Frontend
- https://github.com/ximebarrientos/rollingCodeClub

## 👓 Autores

- **Claudia Ximena Barrientos** [https://github.com/ximebarrientos]
- **Alessandra Borges Licciardi** [https://github.com/Aleblok]
- **Jose David Baza** [https://github.com/JoseBaza91]