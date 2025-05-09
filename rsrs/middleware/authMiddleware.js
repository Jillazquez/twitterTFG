const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const protect = (req, res, next) => {
  let token;

  // Verificar si el token viene en la cabecera Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extraer el token
      console.log('Token recibido:', token); // Log para verificar el token

      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decodificado:', decoded); // Log para ver el contenido del token

      // Añadir el usuario al request
      req.user = decoded;
      
      next(); // Continuar al siguiente middleware o controlador
    } catch (error) {
      console.error('Error al verificar el token:', error);
      return res.status(401).json({ message: 'Token no autorizado.' });
    }
  } else {
    console.log('No se proporcionó token');
    return res.status(401).json({ message: 'No hay token, autorización denegada.' });
  }
};

module.exports = protect;
