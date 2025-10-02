const router = require("express").Router();
const userRoutes = require("./user.routes");
const workoutRoutes = require("./workout.routes");
const exerciseRoutes = require("./exercise.routes");
const workoutExerciseRoutes = require("./workout-exercise.routes");
const workoutScheduleRoutes = require("./workout-schedule.routes");
const workoutReportRoutes = require("./workout-report.routes");

router.use("/users", userRoutes);
router.use("/workouts", workoutRoutes);
router.use("/exercises", exerciseRoutes);
router.use("/workout-exercises", workoutExerciseRoutes);
router.use("/workout-schedules", workoutScheduleRoutes);
router.use("/workout-reports", workoutReportRoutes);

module.exports = router;