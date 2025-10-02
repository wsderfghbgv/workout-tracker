# Commit 1: Scaffold de Router y Endpoints Básicos

## ¿Qué es un Scaffold?
Un scaffold es la **estructura básica** o "esqueleto" de un proyecto. Es como construir los cimientos de una casa antes de agregar las habitaciones.

## Estructura Básica Implementada

### 1. Router Principal
```javascript
// routes/index.js
const express = require("express");
const router = require("express").Router();
const v1Routes = require("./v1");

router.get("/", (req, res) => {
    res.json({
        message: "API is running",
        version: "1.0.0",
        endpoints: {
            v1: "/api/v1"
        }
    });
});

router.use("/v1", v1Routes);
module.exports = router;
```

### 2. Router V1
```javascript
// routes/v1/index.js
const router = require("express").Router();
const userRoutes = require("./user.routes");
const workoutRoutes = require("./workout.routes");
const exerciseRoutes = require("./exercise.routes");

router.use("/users", userRoutes);
router.use("/workouts", workoutRoutes);
router.use("/exercises", exerciseRoutes);

module.exports = router;
```

### 3. Estructura de Endpoints Básicos
Cada recurso tiene la misma estructura base:

```javascript
const express = require("express");
const router = express.Router();

// Datos en memoria (simulación)
let recursos = [];

// Endpoints básicos definidos (sin implementar aún)
router.get('/', (req, res) => {
    // TODO: Implementar lista
});

router.get('/:id', (req, res) => {
    // TODO: Implementar individual
});

router.post('/', (req, res) => {
    // TODO: Implementar creación
});

router.put('/:id', (req, res) => {
    // TODO: Implementar actualización completa
});

router.patch('/:id', (req, res) => {
    // TODO: Implementar actualización parcial
});

router.delete('/:id', (req, res) => {
    // TODO: Implementar eliminación
});

module.exports = router;
```

## Configuración del Servidor
```javascript
// src/app.js
const express = require("express");
const app = express();
const { port } = require('./config/env');
const routes = require("./routes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/api", routes);

// Servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
```

## Endpoints Básicos Definidos

### Users
- `GET /api/v1/users` - Listar usuarios
- `GET /api/v1/users/:id` - Usuario específico
- `POST /api/v1/users` - Crear usuario
- `PUT /api/v1/users/:id` - Actualizar usuario
- `PATCH /api/v1/users/:id` - Actualizar parcial
- `DELETE /api/v1/users/:id` - Eliminar usuario

### Workouts
- `GET /api/v1/workouts` - Listar rutinas
- `GET /api/v1/workouts/:id` - Rutina específica
- `POST /api/v1/workouts` - Crear rutina
- `PUT /api/v1/workouts/:id` - Actualizar rutina
- `PATCH /api/v1/workouts/:id` - Actualizar parcial
- `DELETE /api/v1/workouts/:id` - Eliminar rutina

### Exercises
- `GET /api/v1/exercises` - Listar ejercicios
- `GET /api/v1/exercises/:id` - Ejercicio específico
- `POST /api/v1/exercises` - Crear ejercicio
- `PUT /api/v1/exercises/:id` - Actualizar ejercicio
- `PATCH /api/v1/exercises/:id` - Actualizar parcial
- `DELETE /api/v1/exercises/:id` - Eliminar ejercicio

## Características del Scaffold
✅ Estructura de carpetas organizada
✅ Routers configurados y conectados
✅ Middleware básico configurado
✅ Endpoints definidos (esqueleto)
✅ Servidor funcionando
✅ Versionado de API (v1)

**Nota:** En este punto, los endpoints están definidos pero aún no implementados. Los siguientes commits agregarán la funcionalidad.
