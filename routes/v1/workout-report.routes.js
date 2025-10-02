const express = require("express");
const router = express.Router();

// Estado en memoria (simulación)
let workoutReports = [
  {
    id: "1",
    userId: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    workoutId: "1",
    completedDate: "2025-01-15T10:00:00Z",
    duration: 65,
    caloriesBurned: 350,
    performance: "excellent", // excellent, good, average, poor
    notes: "Muy buen entrenamiento",
    exercisesCompleted: 8,
    totalWeight: 1200,
    averageHeartRate: 145,
    createdAt: "2025-01-15T10:30:00Z"
  }
];

// GET /workout-reports - Listar todos los reportes
router.get('/', (req, res) => {
  const { userId, workoutId, performance, dateFrom, dateTo } = req.query;
  let result = workoutReports;

  if (userId) {
    result = result.filter(wr => wr.userId === userId);
  }

  if (workoutId) {
    result = result.filter(wr => wr.workoutId === workoutId);
  }

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

  res.status(200).json(result);
});

// GET /workout-reports/:id - Obtener un reporte específico
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const workoutReport = workoutReports.find(wr => wr.id === id);

  if (!workoutReport) {
    return res.status(404).json({ error: 'Reporte no encontrado' });
  }

  res.status(200).json(workoutReport);
});

// POST /workout-reports - Crear nuevo reporte
router.post('/', (req, res) => {
  const { userId, workoutId, completedDate, duration, caloriesBurned, performance, notes, exercisesCompleted, totalWeight, averageHeartRate } = req.body;

  if (!userId || !workoutId || !completedDate) {
    return res.status(400).json({ error: 'userId, workoutId y completedDate son requeridos' });
  }

  const newWorkoutReport = {
    id: `${Date.now()}`,
    userId,
    workoutId,
    completedDate,
    duration: duration || 60,
    caloriesBurned: caloriesBurned || 0,
    performance: performance || 'good',
    notes: notes || '',
    exercisesCompleted: exercisesCompleted || 0,
    totalWeight: totalWeight || 0,
    averageHeartRate: averageHeartRate || 0,
    createdAt: new Date().toISOString()
  };

  workoutReports.push(newWorkoutReport);
  res.status(201).json(newWorkoutReport);
});

// PUT /workout-reports/:id - Actualizar reporte completo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { userId, workoutId, completedDate, duration, caloriesBurned, performance, notes, exercisesCompleted, totalWeight, averageHeartRate } = req.body;

  const index = workoutReports.findIndex(wr => wr.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Reporte no encontrado' });
  }

  if (!userId || !workoutId || !completedDate) {
    return res.status(400).json({ error: 'userId, workoutId y completedDate son requeridos' });
  }

  workoutReports[index] = {
    ...workoutReports[index],
    userId,
    workoutId,
    completedDate,
    duration,
    caloriesBurned,
    performance,
    notes,
    exercisesCompleted,
    totalWeight,
    averageHeartRate
  };

  res.status(200).json(workoutReports[index]);
});

// PATCH /workout-reports/:id - Actualizar reporte parcial
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = workoutReports.findIndex(wr => wr.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Reporte no encontrado' });
  }

  workoutReports[index] = {
    ...workoutReports[index],
    ...updates
  };

  res.status(200).json(workoutReports[index]);
});

// DELETE /workout-reports/:id - Eliminar reporte
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = workoutReports.findIndex(wr => wr.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Reporte no encontrado' });
  }

  const deletedWorkoutReport = workoutReports.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
