# Commit 3: Creación de Recursos con POST

## Método POST - Crear Nuevos Recursos

POST es para **crear** algo nuevo. Es como agregar una nueva página a un libro.

### Estructura Básica de POST

```javascript
router.post('/', (req, res) => {
  // 1. Extraer datos del body
  const { campo1, campo2, campo3 } = req.body;
  
  // 2. Validar datos requeridos
  if (!campo1 || !campo2) {
    return res.status(400).json({ error: 'Campos requeridos faltantes' });
  }
  
  // 3. Crear nuevo recurso
  const nuevoRecurso = {
    id: `${Date.now()}`,           // ID único
    campo1,
    campo2,
    campo3: campo3 || 'default',   // Valor por defecto
    createdAt: new Date().toISOString()
  };
  
  // 4. Guardar en array
  recursos.push(nuevoRecurso);
  
  // 5. Responder con el recurso creado
  res.status(201).json(nuevoRecurso);
});
```

## Implementaciones por Recurso

### POST /users - Crear Usuario
```javascript
router.post('/', (req, res) => {
  const { name, email, role } = req.body;
  
  // Validación
  if (!name || !email) {
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }
  
  // Crear usuario
  const newUser = {
    id: `${Date.now()}`,
    name,
    email,
    role: role || 'user',          // Default: 'user'
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});
```

**Ejemplo de Request:**
```json
POST /api/v1/users
{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "role": "user"
}
```

**Ejemplo de Response (201):**
```json
{
  "id": "1704123456789",
  "name": "Juan Pérez",
  "email": "juan@example.com", 
  "role": "user",
  "createdAt": "2025-01-15T10:00:00Z"
}
```

### POST /workouts - Crear Rutina
```javascript
router.post('/', (req, res) => {
  const { name, description, duration, difficulty, userId } = req.body;
  
  // Validación
  if (!name || !userId) {
    return res.status(400).json({ error: 'Name y userId son requeridos' });
  }
  
  // Crear rutina
  const newWorkout = {
    id: `${Date.now()}`,
    name,
    description: description || '',
    duration: duration || 30,      // Default: 30 minutos
    difficulty: difficulty || 'beginner',  // Default: 'beginner'
    userId,
    createdAt: new Date().toISOString()
  };
  
  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
});
```

**Ejemplo de Request:**
```json
POST /api/v1/workouts
{
  "name": "Rutina de fuerza",
  "description": "Rutina para ganar masa muscular",
  "duration": 60,
  "difficulty": "intermediate",
  "userId": "123"
}
```

### POST /exercises - Crear Ejercicio
```javascript
router.post('/', (req, res) => {
  const { name, description, muscleGroup, sets, reps, weight, workoutId } = req.body;
  
  // Validación
  if (!name || !workoutId) {
    return res.status(400).json({ error: 'Name y workoutId son requeridos' });
  }
  
  // Crear ejercicio
  const newExercise = {
    id: `${Date.now()}`,
    name,
    description: description || '',
    muscleGroup: muscleGroup || 'general',
    sets: sets || 3,              // Default: 3 series
    reps: reps || 10,             // Default: 10 repeticiones
    weight: weight || 0,          // Default: sin peso
    workoutId,
    createdAt: new Date().toISOString()
  };
  
  exercises.push(newExercise);
  res.status(201).json(newExercise);
});
```

**Ejemplo de Request:**
```json
POST /api/v1/exercises
{
  "name": "Press de banca",
  "description": "Ejercicio para pecho",
  "muscleGroup": "chest",
  "sets": 3,
  "reps": 10,
  "weight": 80,
  "workoutId": "456"
}
```

### POST /workout-exercises - Crear Asociación
```javascript
router.post('/', (req, res) => {
  const { workoutId, exerciseId, sets, reps, weight, restTime, order, notes } = req.body;
  
  if (!workoutId || !exerciseId) {
    return res.status(400).json({ error: 'workoutId y exerciseId son requeridos' });
  }
  
  const newWorkoutExercise = {
    id: `${Date.now()}`,
    workoutId,
    exerciseId,
    sets: sets || 3,
    reps: reps || 10,
    weight: weight || 0,
    restTime: restTime || 60,     // Default: 60 segundos
    order: order || 1,            // Default: primer ejercicio
    notes: notes || '',
    createdAt: new Date().toISOString()
  };
  
  workoutExercises.push(newWorkoutExercise);
  res.status(201).json(newWorkoutExercise);
});
```

### POST /workout-schedules - Programar Entrenamiento
```javascript
router.post('/', (req, res) => {
  const { workoutId, userId, scheduledDate, duration, status, notes } = req.body;
  
  if (!workoutId || !userId || !scheduledDate) {
    return res.status(400).json({ 
      error: 'workoutId, userId y scheduledDate son requeridos' 
    });
  }
  
  const newWorkoutSchedule = {
    id: `${Date.now()}`,
    workoutId,
    userId,
    scheduledDate,
    duration: duration || 60,
    status: status || 'scheduled',  // Default: 'scheduled'
    notes: notes || '',
    createdAt: new Date().toISOString()
  };
  
  workoutSchedules.push(newWorkoutSchedule);
  res.status(201).json(newWorkoutSchedule);
});
```

### POST /workout-reports - Crear Reporte
```javascript
router.post('/', (req, res) => {
  const { userId, workoutId, completedDate, duration, caloriesBurned, performance, notes, exercisesCompleted, totalWeight, averageHeartRate } = req.body;
  
  if (!userId || !workoutId || !completedDate) {
    return res.status(400).json({ 
      error: 'userId, workoutId y completedDate son requeridos' 
    });
  }
  
  const newWorkoutReport = {
    id: `${Date.now()}`,
    userId,
    workoutId,
    completedDate,
    duration: duration || 60,
    caloriesBurned: caloriesBurned || 0,
    performance: performance || 'good',    // Default: 'good'
    notes: notes || '',
    exercisesCompleted: exercisesCompleted || 0,
    totalWeight: totalWeight || 0,
    averageHeartRate: averageHeartRate || 0,
    createdAt: new Date().toISOString()
  };
  
  workoutReports.push(newWorkoutReport);
  res.status(201).json(newWorkoutReport);
});
```

## Validaciones Implementadas

### Campos Requeridos por Recurso
- **Users**: `name`, `email`
- **Workouts**: `name`, `userId`
- **Exercises**: `name`, `workoutId`
- **Workout Exercises**: `workoutId`, `exerciseId`
- **Workout Schedules**: `workoutId`, `userId`, `scheduledDate`
- **Workout Reports**: `userId`, `workoutId`, `completedDate`

### Valores por Defecto
- **Users**: `role` → 'user'
- **Workouts**: `duration` → 30, `difficulty` → 'beginner'
- **Exercises**: `sets` → 3, `reps` → 10, `weight` → 0
- **Workout Exercises**: `restTime` → 60, `order` → 1
- **Workout Schedules**: `status` → 'scheduled'
- **Workout Reports**: `performance` → 'good'

## Estados HTTP en POST

### 201 - Created (Éxito)
Recurso creado correctamente. Se devuelve el recurso completo con su ID.

### 400 - Bad Request (Error)
Datos faltantes o inválidos.

**Ejemplo de Error:**
```json
{
  "error": "Name y email son requeridos"
}
```

## Características del POST

✅ **Crea recursos nuevos** - Agrega al array en memoria
✅ **Genera IDs únicos** - Usando timestamp
✅ **Validación de datos** - Campos requeridos
✅ **Valores por defecto** - Para campos opcionales
✅ **Estado 201** - Created para éxito
✅ **Estado 400** - Bad Request para errores
✅ **Respuesta completa** - Devuelve el recurso creado con ID
