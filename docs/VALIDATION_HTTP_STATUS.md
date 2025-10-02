# Validación de Parámetros, Query Strings y Estados HTTP

## Estados HTTP Implementados

### 200 - OK
**Uso**: Respuestas exitosas para GET, PUT, PATCH
```javascript
res.status(200).json(result);
```

### 201 - Created  
**Uso**: Creación exitosa de recursos con POST
```javascript
res.status(201).json(newUser);
```

### 204 - No Content
**Uso**: Eliminación exitosa con DELETE
```javascript
res.status(204).send();
```

### 400 - Bad Request
**Uso**: Datos inválidos o campos requeridos faltantes
```javascript
if (!name || !email) {
  return res.status(400).json({ error: 'Name y email son requeridos' });
}
```

### 404 - Not Found
**Uso**: Recurso no encontrado
```javascript
if (!user) {
  return res.status(404).json({ error: 'Usuario no encontrado' });
}
```

## Validación de Parámetros

### Parámetros de Ruta (req.params)
```javascript
router.get('/:id', (req, res) => {
  const { id } = req.params;  // Extrae el ID de la URL
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  res.status(200).json(user);
});
```

### Validación de Body (req.body)
```javascript
router.post('/', (req, res) => {
  const { name, email, role } = req.body;
  
  // Validación de campos requeridos
  if (!name || !email) {
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }
  
  // Validación de formato de email (opcional)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Formato de email inválido' });
  }
  
  // Creación del recurso
  const newUser = {
    id: `${Date.now()}`,
    name,
    email,
    role: role || 'user',
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});
```

## Query Strings (req.query)

### Filtros Implementados

#### Users
```javascript
// GET /users?role=admin&search=carlos
router.get('/', (req, res) => {
  const { role, search } = req.query;
  let result = users;
  
  if (role) {
    result = result.filter(u => u.role === role);
  }
  
  if (search) {
    result = result.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.status(200).json(result);
});
```

#### Workouts
```javascript
// GET /workouts?difficulty=intermediate&userId=123
const { difficulty, userId } = req.query;
if (difficulty) {
  result = result.filter(w => w.difficulty === difficulty);
}
if (userId) {
  result = result.filter(w => w.userId === userId);
}
```

#### Workout Reports
```javascript
// GET /workout-reports?performance=excellent&dateFrom=2025-01-01&dateTo=2025-01-31
const { performance, dateFrom, dateTo } = req.query;

if (performance) {
  result = result.filter(wr => wr.performance === performance);
}

if (dateFrom) {
  const fromDate = new Date(dateFrom);
  result = result.filter(wr => new Date(wr.completedDate) >= fromDate);
}

if (dateTo) {
  const toDate = new Date(dateTo);
  result = result.filter(wr => new Date(wr.completedDate) <= toDate);
}
```

## Manejo de Errores Consistente

### Estructura de Error Estándar
```javascript
{
  "error": "Descripción del error"
}
```

### Ejemplos de Validaciones por Recurso

#### Users
- `name` y `email` requeridos
- `email` debe tener formato válido
- `role` opcional (default: 'user')

#### Workouts  
- `name` y `userId` requeridos
- `difficulty` opcional (default: 'beginner')
- `duration` opcional (default: 30)

#### Exercises
- `name` y `workoutId` requeridos
- `muscleGroup` opcional (default: 'general')
- `sets`, `reps`, `weight` opcionales con valores por defecto

#### Workout Schedules
- `workoutId`, `userId`, `scheduledDate` requeridos
- `status` opcional (default: 'scheduled')
- Validación de fecha válida

#### Workout Reports
- `userId`, `workoutId`, `completedDate` requeridos
- `performance` opcional (default: 'good')
- Validación de rangos numéricos para calorías, peso, etc.
