const express = require('express');
const router = express.Router();
const { getReportedPosts, reportPost } = require('../controllers/postReportedController');
const protect = require('../middleware/authMiddleware'); // middleware que verifica si el usuario está logueado

router.get('/', protect, getReportedPosts); // Solo admins pueden obtener reportes
router.post('/report', protect, reportPost); // Cualquier usuario logueado puede reportar

module.exports = router;
