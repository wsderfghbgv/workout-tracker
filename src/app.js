const express = require("express"); // Import express
const app = express(); // Create an instance of express
const { port } = require('../config/env'); // Import the port from the env file

//importar rutas
const routes = require("../routes");

//midelware para parsear json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Inicializacion del servidor y primera ruta
app.get("/", (req, res) => {
  res.send("Hola mi server en Express");
});

//rutas
app.use("/api", routes);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});