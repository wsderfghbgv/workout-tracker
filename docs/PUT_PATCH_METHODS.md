# Métodos PUT y PATCH Implementados

## PUT - Actualización Completa
Reemplaza completamente el recurso con los nuevos datos.

### Ejemplo PUT /users/:id
```javascript
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  
  // Validación de existencia
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  // Validación de campos requeridos
  if (!name || !email) {
    return res.status(400).json({ error: 'Name y email son requeridos' });
  }
  
  // Actualización completa
  users[index] = {
    ...users[index],
    name,
    email,
    role
  };
  
  res.status(200).json(users[index]);
});
```

## PATCH - Actualización Parcial
Actualiza solo los campos proporcionados.

### Ejemplo PATCH /users/:id
```javascript
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  // Validación de existencia
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  
  // Actualización parcial
  users[index] = {
    ...users[index],
    ...updates
  };
  
  res.status(200).json(users[index]);
});
```

## Diferencias Clave
- **PUT**: Requiere todos los campos, reemplaza completamente
- **PATCH**: Solo actualiza los campos enviados, mantiene el resto
