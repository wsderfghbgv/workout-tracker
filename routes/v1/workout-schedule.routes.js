const express = require("express");
const router = express.Router();

// Estado en memoria (simulación)
let workoutSchedules = [
  {
    id: "1",
    workoutId: "1",
    userId: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
    scheduledDate: "2025-01-20T08:00:00Z",
    duration: 60,
    status: "scheduled", // scheduled, completed, cancelled
    notes: "Entrenamiento matutino",
    createdAt: "2025-01-15T10:00:00Z"
  }
];

// GET /workout-schedules - Listar todos los horarios
router.get('/', (req, res) => {
  const { userId, workoutId, status, date } = req.query;
  let result = workoutSchedules;

  if (userId) {
    result = result.filter(ws => ws.userId === userId);
  }

  if (workoutId) {
    result = result.filter(ws => ws.workoutId === workoutId);
  }

  if (status) {
    result = result.filter(ws => ws.status === status);
  }

  if (date) {
    const targetDate = new Date(date);
    result = result.filter(ws => {
      const scheduleDate = new Date(ws.scheduledDate);
      return scheduleDate.toDateString() === targetDate.toDateString();
    });
  }

  res.status(200).json(result);
});

// GET /workout-schedules/:id - Obtener un horario específico
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const workoutSchedule = workoutSchedules.find(ws => ws.id === id);

  if (!workoutSchedule) {
    return res.status(404).json({ error: 'Horario no encontrado' });
  }

  res.status(200).json(workoutSchedule);
});

// POST /workout-schedules - Crear nuevo horario
router.post('/', (req, res) => {
  const { workoutId, userId, scheduledDate, duration, status, notes } = req.body;

  if (!workoutId || !userId || !scheduledDate) {
    return res.status(400).json({ error: 'workoutId, userId y scheduledDate son requeridos' });
  }

  const newWorkoutSchedule = {
    id: `${Date.now()}`,
    workoutId,
    userId,
    scheduledDate,
    duration: duration || 60,
    status: status || 'scheduled',
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  workoutSchedules.push(newWorkoutSchedule);
  res.status(201).json(newWorkoutSchedule);
});

// PUT /workout-schedules/:id - Actualizar horario completo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { workoutId, userId, scheduledDate, duration, status, notes } = req.body;

  const index = workoutSchedules.findIndex(ws => ws.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Horario no encontrado' });
  }

  if (!workoutId || !userId || !scheduledDate) {
    return res.status(400).json({ error: 'workoutId, userId y scheduledDate son requeridos' });
  }

  workoutSchedules[index] = {
    ...workoutSchedules[index],
    workoutId,
    userId,
    scheduledDate,
    duration,
    status,
    notes
  };

  res.status(200).json(workoutSchedules[index]);
});

// PATCH /workout-schedules/:id - Actualizar horario parcial
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = workoutSchedules.findIndex(ws => ws.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Horario no encontrado' });
  }

  workoutSchedules[index] = {
    ...workoutSchedules[index],
    ...updates
  };

  res.status(200).json(workoutSchedules[index]);
});

// DELETE /workout-schedules/:id - Eliminar horario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = workoutSchedules.findIndex(ws => ws.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Horario no encontrado' });
  }

  const deletedWorkoutSchedule = workoutSchedules.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
