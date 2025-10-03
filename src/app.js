const express = require("express"); // Import express
const app = express(); // Create an instance of express
const { port } = require('../config/env'); // Import the port from the env file

//importar rutas
const routes = require("../routes");

//midelware para parsear json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//midelware para configurar cabeceras HTTP
app.use((req, res, next) => {
    // Permitir CORS
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key');
    
    // Cabeceras personalizadas
    res.set('X-API-Version', '1.0.0');
    res.set('X-Created-By', 'Workout Tracker API');
    
    // Manejar preflight de CORS
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    next();
});


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