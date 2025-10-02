const express = require("express");
const router = express.Router();

// Estado en memoria (simulación)
let workoutExercises = [
  {
    id: "1",
    workoutId: "1",
    exerciseId: "1",
    sets: 3,
    reps: 10,
    weight: 80,
    restTime: 60,
    order: 1,
    notes: "Mantener buena forma",
    createdAt: "2025-01-15T10:00:00Z"
  }
];

// GET /workout-exercises - Listar todas las asociaciones
router.get('/', (req, res) => {
  const { workoutId, exerciseId } = req.query;
  let result = workoutExercises;

  if (workoutId) {
    result = result.filter(we => we.workoutId === workoutId);
  }

  if (exerciseId) {
    result = result.filter(we => we.exerciseId === exerciseId);
  }

  res.status(200).json(result);
});

// GET /workout-exercises/:id - Obtener una asociación específica
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const workoutExercise = workoutExercises.find(we => we.id === id);

  if (!workoutExercise) {
    return res.status(404).json({ error: 'Asociación no encontrada' });
  }

  res.status(200).json(workoutExercise);
});

// POST /workout-exercises - Crear nueva asociación
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
    restTime: restTime || 60,
    order: order || 1,
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  workoutExercises.push(newWorkoutExercise);
  res.status(201).json(newWorkoutExercise);
});

// PUT /workout-exercises/:id - Actualizar asociación completa
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { workoutId, exerciseId, sets, reps, weight, restTime, order, notes } = req.body;

  const index = workoutExercises.findIndex(we => we.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Asociación no encontrada' });
  }

  if (!workoutId || !exerciseId) {
    return res.status(400).json({ error: 'workoutId y exerciseId son requeridos' });
  }

  workoutExercises[index] = {
    ...workoutExercises[index],
    workoutId,
    exerciseId,
    sets,
    reps,
    weight,
    restTime,
    order,
    notes
  };

  res.status(200).json(workoutExercises[index]);
});

// PATCH /workout-exercises/:id - Actualizar asociación parcial
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = workoutExercises.findIndex(we => we.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Asociación no encontrada' });
  }

  workoutExercises[index] = {
    ...workoutExercises[index],
    ...updates
  };

  res.status(200).json(workoutExercises[index]);
});

// DELETE /workout-exercises/:id - Eliminar asociación
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = workoutExercises.findIndex(we => we.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Asociación no encontrada' });
  }

  const deletedWorkoutExercise = workoutExercises.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
