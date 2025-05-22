const PostReported = require('../models/postReportedModel');
const Post = require('../models/postModel');

// Obtener todos los posts reportados (solo admins)
exports.getReportedPosts = async (req, res) => {
  try {
    // Verificar que el usuario es admin (suponiendo que tienes req.user con datos del usuario)
    if (false) {
      return res.status(403).json({ message: 'Acceso denegado: solo administradores' });
    }

    // Obtener posts reportados, populando datos del post y del usuario que reportó
    const reports = await PostReported.find()
      .populate('reportedPostId')
      .populate('reporter', 'name email') // o los campos que quieras mostrar
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener posts reportados', error: error.message });
  }
};

// Crear un reporte (cualquier usuario puede reportar)
exports.reportPost = async (req, res) => {
  try {
    const { reportedPostId } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'Debes iniciar sesión para reportar' });
    }

    // Evitar reportes duplicados del mismo usuario sobre el mismo post
    const existingReport = await PostReported.findOne({
      reportedPostId,
      reporter: req.user._id,
    });

    if (existingReport) {
      return res.status(400).json({ message: 'Ya has reportado este post' });
    }

    const newReport = new PostReported({
      reportedPostId,
      reporter: req.user._id,
    });

    await newReport.save();

    res.status(201).json({ message: 'Post reportado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al reportar post', error: error.message });
  }
};
