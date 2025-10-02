# Workout Tracker API

API REST para gestión de entrenamientos, ejercicios y seguimiento de progreso.

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start

# El servidor se ejecuta en http://localhost:3000
```

## 📋 Endpoints Disponibles

### Base URL: `http://localhost:3000/api/v1`

---

## 👤 Users (Usuarios)

### GET /users
Obtener todos los usuarios con filtros opcionales.

**Query Parameters:**
- `role` - Filtrar por rol (user, admin)
- `search` - Buscar por nombre

**Ejemplo Request:**
```bash
GET /api/v1/users?role=user&search=carlos
```

**Ejemplo Response (200):**
```json
[
  {
    "id": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    "name": "Carlos Navia",
    "email": "carlos@example.com",
    "role": "user",
    "createdAt": "2025-09-12T12:00:00Z"
  }
]
```

### GET /users/:id
Obtener un usuario específico.

**Ejemplo Response (200):**
```json
{
  "id": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
  "name": "Carlos Navia",
  "email": "carlos@example.com",
  "role": "user",
  "createdAt": "2025-09-12T12:00:00Z"
}
```

**Error Response (404):**
```json
{
  "error": "Usuario no encontrado"
}
```

### POST /users
Crear un nuevo usuario.

**Request Body:**
```json
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "role": "user"
}
```

**Response (201):**
```json
{
  "id": "1704123456789",
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "role": "user",
  "createdAt": "2025-01-15T10:00:00Z"
}
```

### PUT /users/:id
Actualizar completamente un usuario.

**Request Body:**
```json
{
  "name": "Juan Carlos Pérez",
  "email": "juancarlos@example.com",
  "role": "admin"
}
```

### PATCH /users/:id
Actualizar parcialmente un usuario.

**Request Body:**
```json
{
  "role": "admin"
}
```

### DELETE /users/:id
Eliminar un usuario.

**Response (204):** Sin contenido

---

## 🏋️ Workouts (Rutinas)

### GET /workouts
Obtener todas las rutinas con filtros opcionales.

**Query Parameters:**
- `difficulty` - Filtrar por dificultad (beginner, intermediate, advanced)
- `userId` - Filtrar por usuario

**Ejemplo Request:**
```bash
GET /api/v1/workouts?difficulty=intermediate&userId=123
```

### POST /workouts
Crear una nueva rutina.

**Request Body:**
```json
{
  "name": "Rutina de fuerza",
  "description": "Rutina para ganar masa muscular",
  "duration": 60,
  "difficulty": "intermediate",
  "userId": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611"
}
```

---

## 💪 Exercises (Ejercicios)

### GET /exercises
Obtener todos los ejercicios con filtros opcionales.

**Query Parameters:**
- `muscleGroup` - Filtrar por grupo muscular
- `workoutId` - Filtrar por rutina

### POST /exercises
Crear un nuevo ejercicio.

**Request Body:**
```json
{
  "name": "Press de banca",
  "description": "Ejercicio para pecho",
  "muscleGroup": "chest",
  "sets": 3,
  "reps": 10,
  "weight": 80,
  "workoutId": "1"
}
```

---

## 🔗 Workout Exercises (Asociaciones)

### GET /workout-exercises
Obtener asociaciones entre rutinas y ejercicios.

**Query Parameters:**
- `workoutId` - Filtrar por rutina
- `exerciseId` - Filtrar por ejercicio

### POST /workout-exercises
Crear una nueva asociación.

**Request Body:**
```json
{
  "workoutId": "1",
  "exerciseId": "1",
  "sets": 3,
  "reps": 12,
  "weight": 75,
  "restTime": 90,
  "order": 1,
  "notes": "Mantener buena forma"
}
```

---

## 📅 Workout Schedules (Horarios)

### GET /workout-schedules
Obtener horarios de entrenamientos.

**Query Parameters:**
- `userId` - Filtrar por usuario
- `workoutId` - Filtrar por rutina
- `status` - Filtrar por estado (scheduled, completed, cancelled)
- `date` - Filtrar por fecha específica

### POST /workout-schedules
Programar un entrenamiento.

**Request Body:**
```json
{
  "workoutId": "1",
  "userId": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
  "scheduledDate": "2025-01-20T08:00:00Z",
  "duration": 60,
  "status": "scheduled",
  "notes": "Entrenamiento matutino"
}
```

---

## 📊 Workout Reports (Reportes)

### GET /workout-reports
Obtener reportes de entrenamientos.

**Query Parameters:**
- `userId` - Filtrar por usuario
- `workoutId` - Filtrar por rutina
- `performance` - Filtrar por rendimiento (excellent, good, average, poor)
- `dateFrom` - Fecha desde
- `dateTo` - Fecha hasta

### POST /workout-reports
Crear un reporte de entrenamiento.

**Request Body:**
```json
{
  "userId": "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
  "workoutId": "1",
  "completedDate": "2025-01-20T09:00:00Z",
  "duration": 65,
  "caloriesBurned": 350,
  "performance": "excellent",
  "notes": "Muy buen entrenamiento",
  "exercisesCompleted": 8,
  "totalWeight": 1200,
  "averageHeartRate": 145
}
```

---

## 📋 Códigos de Estado HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| **200** | OK | GET, PUT, PATCH exitosos |
| **201** | Created | POST exitoso (recurso creado) |
| **204** | No Content | DELETE exitoso |
| **400** | Bad Request | Datos inválidos o faltantes |
| **404** | Not Found | Recurso no encontrado |

---

## 🛠️ Estructura del Proyecto

```
workout-tracker/
├── src/
│   └── app.js              # Servidor principal
├── routes/
│   ├── index.js            # Router principal
│   └── v1/
│       ├── index.js        # Router v1
│       ├── user.routes.js  # Rutas de usuarios
│       ├── workout.routes.js # Rutas de rutinas
│       ├── exercise.routes.js # Rutas de ejercicios
│       ├── workout-exercise.routes.js # Asociaciones
│       ├── workout-schedule.routes.js # Horarios
│       └── workout-report.routes.js # Reportes
├── config/
│   └── env.js              # Configuración de entorno
└── docs/                   # Documentación adicional
```

---

## 🌿 Ramas de Desarrollo

- `feat/users` - Gestión de usuarios
- `feat/workouts` - Gestión de rutinas
- `feat/exercises` - Gestión de ejercicios
- `feat/workout-exercise` - Asociaciones
- `feat/workout-schedule` - Horarios
- `feat/workout-report` - Reportes

---

## 📝 Ejemplos de Uso Completos

### Crear un flujo completo:

1. **Crear usuario:**
```bash
POST /api/v1/users
{
  "name": "Ana García",
  "email": "ana@example.com",
  "role": "user"
}
```

2. **Crear rutina:**
```bash
POST /api/v1/workouts
{
  "name": "Rutina de cardio",
  "description": "Rutina para quemar grasa",
  "duration": 45,
  "difficulty": "beginner",
  "userId": "1704123456789"
}
```

3. **Programar entrenamiento:**
```bash
POST /api/v1/workout-schedules
{
  "workoutId": "1704123456790",
  "userId": "1704123456789",
  "scheduledDate": "2025-01-21T07:00:00Z",
  "duration": 45,
  "status": "scheduled"
}
```

4. **Registrar resultados:**
```bash
POST /api/v1/workout-reports
{
  "userId": "1704123456789",
  "workoutId": "1704123456790",
  "completedDate": "2025-01-21T07:45:00Z",
  "duration": 45,
  "caloriesBurned": 300,
  "performance": "good"
}
```

---

## 👨‍💻 Autor

**Andres Narvaez**  
Workout Tracker API v1.0.0
