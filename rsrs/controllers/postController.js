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
            .populate('author', 'name')
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error obteniendo los posts del usuario', error: err.message });
    }
};

exports.createPost = async (req, res) => {
    try {
        const { content, author } = req.body;

        const newPost = new Post({
            content,
            author,
        });

        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ message: 'Error al crear la publicación', error: err.message });
    }
};

exports.toggleLike = async (req, res) => {
    try {
        const { postId, currentUser } = req.body;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }
        console.log()
        const user = await User.findOne({ name: currentUser });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const userId = user._id.toString();
        console.log(currentUser);
        console.log("NUEVO");
        console.log(userId);
        console.log('-------------------------------------');
        console.log(post.likes.includes(userId));
        console.log('-------------------------------------');
        const hasLiked = post.likes.includes(userId);

        if (hasLiked) {
            post.likes = post.likes.filter(id => id.toString() !== userId.toString());
        } else {
            post.likes.push(userId);
        }

        await post.save();
        res.status(200).json({
            message: hasLiked ? 'Like eliminado' : 'Like añadido',
            likes: post.likes, 
            postId: post._id
        });
        

    } catch (err) {
        res.status(500).json({ message: 'Error al dar/quitar like', error: err.message });
    }
};
