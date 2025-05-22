require('dotenv').config();
const mongoose = require('mongoose');

async function checkDatabaseConnection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conexión a la base de datos OK');
    await mongoose.disconnect();
    process.exit(0); 
  } catch (error) {
    console.error('❌ Error en conexión a la base de datos:', error.message);
    process.exit(1); 
  }
}

checkDatabaseConnection();
