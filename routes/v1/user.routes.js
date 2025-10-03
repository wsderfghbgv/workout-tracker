const express = require("express");
const router = express.Router();
// Nota: Se eliminó la ruta duplicada GET '/' para evitar conflictos.
// Se mantiene una sola definición de GET '/' (la que soporta filtros por query).
 
// Estado en memoria (simulación)
let users = [
    {
      id: "b42f53fa-7b30-4b91-8d36-dc1c6ef27611",
      name: "Carlos Navia",
      email: "carlos@example.com",
      role: "user",
      createdAt: "2025-09-12T12:00:00Z"
    }
  ];
  

// (Eliminada) Ruta duplicada GET '/' que devolvía todo sin filtros


// GET /users/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;   // 1
    const user = users.find(u => u.id === id);   // 2
  
    if (!user) {   // 3
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  
    res.status(200).json(user);   // 4
  });

   // POST /users
router.post('/', (req, res) => {
    // Validación de cabeceras de autorización
    const authorization = req.get('Authorization');
    const apiKey = req.get('X-API-Key');
    const contentType = req.get('Content-Type');
    
    // Validar que el contenido sea JSON
    if (contentType && !contentType.includes('application/json')) {
      return res.status(415).json({ error: 'Content-Type debe ser application/json' });
    }

    const { name, email, role } = req.body;   // 1
  
    if (!name || !email) {   // 2
      return res.status(400).json({ error: 'Name y email son requeridos' });
    }
  
    const newUser = {   // 3
      id: `${Date.now()}`,  // identificador temporal
      name,
      email,
      role: role || 'user',  // valor por defecto si no envían rol
      createdAt: new Date().toISOString()
    };
  
    users.push(newUser);   // 4

    // Configurar cabeceras de respuesta
    res.set('Location', `/api/v1/users/${newUser.id}`);
    res.set('X-Created-At', newUser.createdAt);
  
    res.status(201).json(newUser);   // 5
  });
  
// PUT /users/:id
router.put('/:id', (req, res) => {
    const { id } = req.params;              // 1
    const { name, email, role } = req.body; // 2
  
    const index = users.findIndex(u => u.id === id); // 3
    if (index === -1) {                     // 4
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  
    if (!name || !email) {                  // 5
      return res.status(400).json({ error: 'Name y email son requeridos' });
    }
  
    users[index] = {                        // 6
      ...users[index], // conserva los datos previos
      name,
      email,
      role
    };
  
    res.status(200).json(users[index]);     // 7
  });

  // PATCH /users/:id
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  users[index] = {
    ...users[index],
    ...updates
  };

  res.status(200).json(users[index]);
});

  // DELETE /users/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;                            // 1
    const index = users.findIndex(u => u.id === id);      // 2
  
    if (index === -1) {                                   // 3
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  
    const deletedUser = users.splice(index, 1);           // 4
    res.status(204).send(); // 5
  });

  // GET /users?role=user&search=Carlos
router.get('/', (req, res) => {
    // Leer cabeceras HTTP
    const contentType = req.get('Content-Type');
    const apiKey = req.get('X-API-Key');
    const userAgent = req.get('User-Agent');
    
    const { role, search } = req.query;  // 1
    let result = users;                  // 2
  
    if (role) {                          // 3
      result = result.filter(u => u.role === role);
    }
  
    if (search) {                        // 4
      result = result.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Configurar cabeceras de respuesta adicionales
    res.set('X-Total-Count', result.length);
    res.set('Cache-Control', 'no-cache');
  
    res.status(200).json({
      data: result,
      meta: {
        total: result.length,
        contentType: contentType,
        timestamp: new Date().toISOString()
      }
    });        // 5
  });
  
// Middleware de manejo de errores con estado 500
router.use((error, req, res, next) => {
    console.error('Error interno del servidor:', error);
    
    // Configurar cabeceras de error
    res.set('X-Error-Type', 'InternalServerError');
    res.set('X-Timestamp', new Date().toISOString());
    
    res.status(500).json({
        error: 'Error interno del servidor',
        message: 'Ha ocurrido un error inesperado',
        timestamp: new Date().toISOString(),
        status: 500
    });
});

module.exports = router;