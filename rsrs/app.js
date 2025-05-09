const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware para habilitar CORS
app.use(cors()); // Esto habilita CORS para todas las rutas

// Middleware para parsear JSON
app.use(express.json()); // Solo necesitas esto una vez

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/post', postRoutes);

// Exportar la app para usarla en server.js
module.exports = app;
