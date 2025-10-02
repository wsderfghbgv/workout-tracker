const express = require("express");
const router = express.Router();

// Estado en memoria (simulación)
let exercises = [
  {
    id: "1",
    name: "Press de banca",
    description: "Ejercicio para pecho",
    muscleGroup: "chest",
    sets: 3,
    reps: 10,
    weight: 80,
    workoutId: "1",
    createdAt: "2025-01-15T10:30:00Z"
  }
];

// GET /exercises - Listar todos los ejercicios
router.get('/', (req, res) => {
  const { muscleGroup, workoutId } = req.query;
  let result = exercises;

  if (muscleGroup) {
    result = result.filter(e => e.muscleGroup === muscleGroup);
  }

  if (workoutId) {
    result = result.filter(e => e.workoutId === workoutId);
  }

  res.status(200).json(result);
});

// GET /exercises/:id - Obtener un ejercicio específico
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const exercise = exercises.find(e => e.id === id);

  if (!exercise) {
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

  res.status(200).json(exercise);
});

// POST /exercises - Crear nuevo ejercicio
router.post('/', (req, res) => {
  const { name, description, muscleGroup, sets, reps, weight, workoutId } = req.body;

  if (!name || !workoutId) {
    return res.status(400).json({ error: 'Name y workoutId son requeridos' });
  }

  const newExercise = {
    id: `${Date.now()}`,
    name,
    description: description || '',
    muscleGroup: muscleGroup || 'general',
    sets: sets || 3,
    reps: reps || 10,
    weight: weight || 0,
    workoutId,
    createdAt: new Date().toISOString()
  };

  exercises.push(newExercise);
  res.status(201).json(newExercise);
});

// PUT /exercises/:id - Actualizar ejercicio completo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, muscleGroup, sets, reps, weight, workoutId } = req.body;

  const index = exercises.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

  if (!name || !workoutId) {
    return res.status(400).json({ error: 'Name y workoutId son requeridos' });
  }

  exercises[index] = {
    ...exercises[index],
    name,
    description,
    muscleGroup,
    sets,
    reps,
    weight,
    workoutId
  };

  res.status(200).json(exercises[index]);
});

// PATCH /exercises/:id - Actualizar ejercicio parcial
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = exercises.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

  exercises[index] = {
    ...exercises[index],
    ...updates
  };

  res.status(200).json(exercises[index]);
});

// DELETE /exercises/:id - Eliminar ejercicio
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = exercises.findIndex(e => e.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Ejercicio no encontrado' });
  }

  const deletedExercise = exercises.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
