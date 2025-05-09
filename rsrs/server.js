const mongoose = require('mongoose');
const config = require('./config/config');
const app = require('./app');
require('./config/cloudinaryConfig');
require('dotenv').config();

// Conexion a la base de datos

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos');
    app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('Error conectando a la base de datos', err);
  });