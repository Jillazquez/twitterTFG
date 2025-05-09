const Post = require('../models/postModel');
const User = require('../models/userModel');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener posts', error: err.message });
    }
};

exports.getUserPostsByName = async (req, res) => {
    try {
        const { name } = req.params; 

        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const posts = await Post.find({ author: user._id })
            .populate('author', 'name') // Poblar el campo 'author' con el nombre
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error obteniendo los posts del usuario', error: err.message });
    }
};


exports.createPost = async (req, res) => {
    try {
        const { content,author } = req.body;  // Por ejemplo, solo el contenido del post

        console.log(req.body)
        console.log("AQUI EL USER")
        console.log(author)

        const newPost = new Post({
            content,
            author, // Asociar la publicación al usuario
        });
        console.log("AQUI VIENE EL POST")
        console.log(newPost)
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear la publicación', error: err.message });
    }
};