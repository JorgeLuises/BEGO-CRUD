# API de Gestión de Órdenes de Transporte

## 📋 Descripción del Proyecto

Esta es una API RESTful desarrollada con **Express.js** y **TypeScript** que permite gestionar órdenes de transporte de manera integral. La aplicación maneja usuarios, transportes, ubicaciones y órdenes con un sistema de autenticación basado en JWT y validaciones robustas.

## 🏗️ Arquitectura del Proyecto

El proyecto está estructurado en **4 módulos principales**, cada uno con su propia funcionalidad específica:

### 1️⃣ **Módulo Users** 
Gestión completa de usuarios con autenticación segura.

**Funcionalidades:**
- ✅ Registro de nuevos usuarios
- ✅ Login con credenciales
- ✅ Encriptación de contraseñas con **bcrypt**
- ✅ Generación de tokens JWT para autenticación
- ✅ Middleware de autenticación para rutas protegidas

### 2️⃣ **Módulo Trucks**
Administración de transportes vinculados a usuarios.

**Funcionalidades:**
- ✅ Registro de transportes
- ✅ Edición de información del transporte
- ✅ Eliminación de transportes
- ✅ Listado de transportes por usuario
- ✅ Relación directa con el usuario propietario

### 3️⃣ **Módulo Locations**
Gestión de ubicaciones reales utilizando Google Places API.

**Funcionalidades:**
- ✅ Alta de nuevas ubicaciones
- ✅ Actualización de ubicaciones existentes
- ✅ Eliminación de ubicaciones
- ✅ Listado de ubicaciones del usuario
- ✅ Integración con **Google Places API** para datos en tiempo real
- ✅ Obtención automática de dirección, latitud y longitud
- ✅ Validación para prevenir ubicaciones duplicadas

### 4️⃣ **Módulo Orders**
Sistema completo de gestión de órdenes de transporte.

**Funcionalidades:**
- ✅ Creación de nuevas órdenes
- ✅ Actualización de órdenes existentes
- ✅ Eliminación de órdenes
- ✅ Listado de órdenes por usuario
- ✅ Validación: ubicación de pickup ≠ ubicación de dropoff
- ✅ Sistema de estados de orden:
  - `created`: Orden recién creada
  - `in transit`: Orden en tránsito  
  - `completed`: Orden completada
- ✅ Endpoint específico para actualización de estado

## 🔐 Sistema de Autenticación

Todas las rutas (excepto registro y login) están protegidas por un **middleware de autenticación** que:

- Valida la presencia del token JWT en los headers
- Verifica la validez del token
- Extrae la información del usuario para asociarla a las operaciones
- Bloquea el acceso si no se proporciona un token válido

## 🛠️ Tecnologías Utilizadas

### **Backend Framework**
- **Express.js**: Framework web rápido y minimalista
- **TypeScript**: Superset de JavaScript con tipado estático

### **Base de Datos**
- **MongoDB**: Base de datos NoSQL para almacenamiento flexible
- **Mongoose**: ODM para modelado de datos y validaciones

### **Seguridad**
- **bcrypt**: Encriptación segura de contraseñas
- **jsonwebtoken (JWT)**: Autenticación basada en tokens

### **APIs Externas**
- **Google Places API**: Obtención de datos de ubicaciones reales

### **Herramientas de Desarrollo**
- **nodemon**: Recarga automática durante el desarrollo
- **morgan**: Logger de peticiones HTTP
- **dotenv**: Gestión de variables de entorno

## 📦 Instalación y Configuración

### **Requisitos Previos**
- Node.js (v14 o superior)
- npm o yarn
- MongoDB (local o MongoDB Atlas)
- Cuenta de Google Cloud con Places API habilitada

### **Pasos de Instalación**

1. **Clonar el repositorio**
   ```bash
   git clone <https://github.com/JorgeLuises/BEGO-CRUD>
   cd <BEGO-CRUD>
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   # Base de datos
   MONGODB_URI=mongodb://localhost:27017/transport-api
   # o para MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/transport-api
   
   # JWT
   JWT_SECRET=tu_jwt_secret_muy_seguro
   
   # Servidor
   PORT=3000
   ```

4. **Compilar TypeScript**
   ```bash
   npm run build
   ```

5. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

6. **Ejecutar en modo producción**
   ```bash
   npm start
   ```

## 🚀 Scripts Disponibles

```json
{
  "scripts": {
    "dev": "concurrently \"tsc -w\" \"nodemon dist/index.js\"",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
  }
}
```

## 📚 Documentación de API

### **Endpoints Públicos**
- `POST /api/users/registro` - Registro de usuario
- `POST /api/users/login` - Login de usuario

### **Endpoints Protegidos** (requieren token JWT)

#### **Trucks**
- `GET /api/trucks/obtenerTrucks` - Listar transportes del usuario
- `POST /api/trucks/crearTruck` - Crear nuevo transporte
- `PUT /api/trucks/actualizarTruck/:id` - Actualizar transporte
- `DELETE /api/trucks/eliminarTruck/:id` - Eliminar transporte

#### **Locations**
- `GET /api/locations/obternerUbicaciones` - Listar ubicaciones del usuario
- `POST /api/locations/crearUbicacion` - Crear nueva ubicación
- `PUT /api/locations/actuailizarUbicacion/:id` - Actualizar ubicación
- `DELETE /api/locations/eliminarUbicacion/:id` - Eliminar ubicación

#### **Orders**
- `GET /api/orders/verOrdenes` - Listar órdenes del usuario
- `POST /api/orders/crearOrden` - Crear nueva orden
- `PUT /api/orders/actualizarOrden/:id` - Actualizar orden completa
- `PATCH /api/orders/actualizarEstatus/:id` - Actualizar solo el estado
- `DELETE /api/orders/eliminarOrden/:id` - Eliminar orden

## 📁 Estructura del Proyecto

```
src/
├── controllers/         # Lógica de controladores
├── models/             # Modelos de Mongoose
├── routes/             # Definición de rutas
├── middlewares/        # Middlewares personalizados
├── app.ts              # Configuración de rutas y middlewares
├── database.ts         # Conexion a la base de datos
└── index.ts            # Punto de entrada de la aplicación
```

## 🔧 Configuración Adicional

### **MongoDB**
Asegúrate de tener MongoDB ejecutándose localmente o una conexión válida a MongoDB Atlas.

### **Google Places API**
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Habilita la Places API
3. Crea credenciales (API Key)
4. Agrega la clave a tu archivo `.env`

## 🤝 Contribución

1. Fork del proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia ISC.

## 👨‍💻 Autor

**Jorge Luis Escobedo Solana**
- GitHub: [@JorgeLuises](https://github.com/JorgeLuises)
- Email: jorge.luis.es612@outlook.com.com

---

⭐ Si este proyecto te fue útil, ¡no olvides darle una estrella!