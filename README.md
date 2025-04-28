# API RESTful con Node.js, Express y MongoDB

API RESTful para gestión de usuarios desarrollada con Node.js, Express y MongoDB. Incluye operaciones CRUD completas y pruebas unitarias.

##  Características

- Operaciones CRUD completas para usuarios
- Validación de datos
- Manejo de errores personalizado
- Pruebas unitarias con Jest
- Soft delete para usuarios
- Estructura de respuesta estandarizada

##  Prerrequisitos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd NodeExpressMongoDB
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/nodedb
```

## Ejecución

Para iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

Para ejecutar las pruebas:
```bash
npm test
```

## Documentación de la API

### Endpoints de Usuarios

#### Crear Usuario
```http
POST /api/users
```
Body:
```json
{
  "name": "Nombre Usuario",
  "email": "usuario@ejemplo.com",
  "age": 25,
  "phone": "1234567890",
  "address": "Dirección del usuario"
}
```

#### Obtener Todos los Usuarios
```http
GET /api/users
```

#### Obtener Usuario por ID
```http
GET /api/users/:id
```

#### Actualizar Usuario
```http
PUT /api/users/:id
```
Body:
```json
{
  "name": "Nuevo Nombre",
  "email": "nuevo@email.com"
}
```

#### Desactivar Usuario (Soft Delete)
```http
DELETE /api/users/:id
```

### Estructura de Respuesta

Todas las respuestas siguen el formato:
```json
{
  "success": true,
  "data": {
    // Datos de la respuesta
  }
}
```

En caso de error:
```json
{
  "success": false,
  "error": {
    "message": "Mensaje de error",
    "code": "CÓDIGO_DE_ERROR"
  }
}
```

## Pruebas

El proyecto incluye pruebas unitarias para cada operación CRUD:

- Creación de usuarios
- Lectura de usuarios
- Actualización de usuarios
- Desactivación de usuarios

Para ejecutar las pruebas:
```bash
npm test
```

## Estructura del Proyecto

```
src/
├── controllers/     # Controladores de la aplicación
├── models/          # Modelos de MongoDB
├── routes/          # Rutas de la API
├── tests/           # Pruebas unitarias
├── errors/          # Clases de errores personalizadas
└── app.ts          # Configuración de Express
```

## Decisiones de Diseño

1. **Soft Delete**: En lugar de eliminar físicamente los usuarios, se cambia su estado a "inactive" para mantener un historial.

2. **Validaciones**: Se implementan validaciones tanto a nivel de modelo como de controlador para asegurar la integridad de los datos.

3. **Manejo de Errores**: Se utiliza un sistema personalizado de errores para proporcionar mensajes claros y consistentes.

4. **Pruebas Unitarias**: Se implementan pruebas para cada operación CRUD, incluyendo casos de éxito y error.

5. **Estructura de Respuesta**: Todas las respuestas siguen un formato estandarizado para facilitar el consumo de la API.