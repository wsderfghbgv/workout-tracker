const router = require("express").Router();
const userRoutes = require("./user.routes");
const workoutRoutes = require("./workout.routes");
const exerciseRoutes = require("./exercise.routes");

router.use("/users", userRoutes);
router.use("/workouts", workoutRoutes);
router.use("/exercises", exerciseRoutes);

module.exports = router;