const express = require('express');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const postReportedRoutes = require('./routes/reportedPostRoutes');

const app = express();

app.use(cors());

// Middleware para parsear JSON
app.use(express.json()); // Solo necesitas esto una vez

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/post', postRoutes);

// ONLY FOR TESTING REASONS
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  


app.use('/api/reported-posts', postReportedRoutes);

// Exportar la app para usarla en server.js
module.exports = app;
