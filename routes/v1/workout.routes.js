const express = require("express");
const router = express.Router();

// Estado en memoria (simulación)
let workouts = [
  {
    id: "1",
    name: "Rutina de fuerza",
    description: "Rutina para ganar masa muscular",
    duration: 60,
    difficulty: "intermediate",
    userId: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    createdAt: "2025-01-15T10:00:00Z"
  }
];

// GET /workouts - Listar todas las rutinas
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

// GET /workouts/:id - Obtener una rutina específica
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const workout = workouts.find(w => w.id === id);

  if (!workout) {
    return res.status(404).json({ error: 'Rutina no encontrada' });
  }

  res.status(200).json(workout);
});

// POST /workouts - Crear nueva rutina
router.post('/', (req, res) => {
  const { name, description, duration, difficulty, userId } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ error: 'Name y userId son requeridos' });
  }

  const newWorkout = {
    id: `${Date.now()}`,
    name,
    description: description || '',
    duration: duration || 30,
    difficulty: difficulty || 'beginner',
    userId,
    createdAt: new Date().toISOString()
  };

  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
});

// PUT /workouts/:id - Actualizar rutina completa
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, duration, difficulty, userId } = req.body;

  const index = workouts.findIndex(w => w.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Rutina no encontrada' });
  }

  if (!name || !userId) {
    return res.status(400).json({ error: 'Name y userId son requeridos' });
  }

  workouts[index] = {
    ...workouts[index],
    name,
    description,
    duration,
    difficulty,
    userId
  };

  res.status(200).json(workouts[index]);
});

// PATCH /workouts/:id - Actualizar rutina parcial
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = workouts.findIndex(w => w.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Rutina no encontrada' });
  }

  workouts[index] = {
    ...workouts[index],
    ...updates
  };

  res.status(200).json(workouts[index]);
});

// DELETE /workouts/:id - Eliminar rutina
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = workouts.findIndex(w => w.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Rutina no encontrada' });
  }

  const deletedWorkout = workouts.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
