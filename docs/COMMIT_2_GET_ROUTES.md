# Commit 2: Implementación de Rutas GET (Lista e Individual)

## Rutas GET Implementadas

Las rutas GET son para **consultar** información sin modificar nada. Son como "leer" un libro.

### GET Lista - Obtener Todos los Recursos

#### Ejemplo: GET /users
```javascript
router.get('/', (req, res) => {
  const { role, search } = req.query;  // Parámetros de filtro
  let result = users;                  // Empezar con todos los usuarios
  
  // Filtrar por rol si se especifica
  if (role) {
    result = result.filter(u => u.role === role);
  }
  
  // Filtrar por búsqueda si se especifica
  if (search) {
    result = result.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.status(200).json(result);        // Devolver resultados
});
```

**Ejemplos de uso:**
```bash
GET /api/v1/users                    # Todos los usuarios
GET /api/v1/users?role=admin         # Solo usuarios admin
GET /api/v1/users?search=carlos      # Usuarios con "carlos" en el nombre
GET /api/v1/users?role=user&search=juan  # Usuarios "user" con "juan"
```

#### Ejemplo: GET /workouts
```javascript
router.get('/', (req, res) => {
  const { difficulty, userId } = req.query;
  let result = workouts;

  if (difficulty) {
    result = result.filter(w => w.difficulty === difficulty);
  }

  if (userId) {
    result = result.filter(w => w.userId === userId);
  }

  res.status(200).json(result);
});
```

**Ejemplos de uso:**
```bash
GET /api/v1/workouts                     # Todas las rutinas
GET /api/v1/workouts?difficulty=easy     # Solo rutinas fáciles
GET /api/v1/workouts?userId=123          # Rutinas del usuario 123
```

### GET Individual - Obtener Un Recurso Específico

#### Ejemplo: GET /users/:id
```javascript
router.get('/:id', (req, res) => {
  const { id } = req.params;           // Extraer ID de la URL
  const user = users.find(u => u.id === id);  // Buscar usuario
  
  if (!user) {                         // Si no existe
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  res.status(200).json(user);          // Devolver usuario encontrado
});
```

**Ejemplos de uso:**
```bash
GET /api/v1/users/123                # Usuario con ID 123
GET /api/v1/workouts/456             # Rutina con ID 456
GET /api/v1/exercises/789            # Ejercicio con ID 789
```

## Respuestas Típicas

### Respuesta Exitosa (200)
```json
// GET /users/123
{
  "id": "123",
  "name": "Carlos Navia",
  "email": "carlos@example.com",
  "role": "user",
  "createdAt": "2025-01-15T10:00:00Z"
}
```

### Lista Exitosa (200)
```json
// GET /users
[
  {
    "id": "123",
    "name": "Carlos Navia",
    "email": "carlos@example.com",
    "role": "user"
  },
  {
    "id": "124", 
    "name": "Ana García",
    "email": "ana@example.com",
    "role": "admin"
  }
]
```

### Recurso No Encontrado (404)
```json
// GET /users/999 (no existe)
{
  "error": "Usuario no encontrado"
}
```

## Filtros Implementados por Recurso

### Users
- `role` - Filtrar por rol (user, admin)
- `search` - Buscar en el nombre

### Workouts
- `difficulty` - Filtrar por dificultad (easy, medium, hard)
- `userId` - Filtrar por usuario propietario

### Exercises
- `muscleGroup` - Filtrar por grupo muscular
- `workoutId` - Filtrar por rutina

### Workout Exercises
- `workoutId` - Asociaciones de una rutina específica
- `exerciseId` - Asociaciones de un ejercicio específico

### Workout Schedules
- `userId` - Horarios de un usuario
- `workoutId` - Horarios de una rutina
- `status` - Por estado (scheduled, completed, cancelled)
- `date` - Por fecha específica

### Workout Reports
- `userId` - Reportes de un usuario
- `workoutId` - Reportes de una rutina
- `performance` - Por rendimiento (excellent, good, average, poor)
- `dateFrom` y `dateTo` - Rango de fechas

## Características de las Rutas GET

✅ **Solo lectura** - No modifican datos
✅ **Filtros opcionales** - Query parameters
✅ **Búsqueda por ID** - Parámetros de ruta
✅ **Estados HTTP correctos** - 200 (éxito), 404 (no encontrado)
✅ **Respuestas JSON** - Formato estándar
✅ **Manejo de errores** - Validación de existencia
