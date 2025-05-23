const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req,res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json({message:'Error al obtener usuarios'});
    }
};

exports.getNumberFollowers = async (req, res) => {
    try {
      const { username } = req.body;
  
      if (!username) {
        return res.status(400).json({ message: 'Falta el nombre de usuario en el cuerpo de la solicitud' });
      }

      const usuario = await User.findOne({ name: username });
  
      if (!usuario) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      const numFollowers = usuario.followers.length;
  
      res.status(200).json({ numFollowers: numFollowers });
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener número de seguidores', error: err.message });
    }
  };
  

exports.isFollowing = async (req, res) => {
    try {
        const { seguidor, seguido } = req.body;

        const seguidorId = await User.findOne({ name: seguidor });
        const seguidoId = await User.findOne({ name: seguido });

        if (!seguidorId || !seguidoId) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isFollowing = seguidoId.followers.includes(seguidorId._id);

        res.status(200).json({ isFollowing });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al verificar la relación de seguimiento', error: err.message });
    }
};


exports.followUser = async (req,res) => {
    try{
        const {seguidor,seguido } = req.body;
        
        const seguidorId = await User.findOne({ name: seguidor });
        const seguidoId = await User.findOne({ name: seguido });
        
        
        if (!seguidorId || !seguidoId) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (seguidoId.followers.includes(seguidorId._id)) {
            return res.status(400).json({ message: 'Ya sigues a este usuario' });
        }

        seguidoId.followers.push(seguidorId._id);

        seguidorId.following.push(seguidoId._id);

        await seguidorId.save();
        await seguidoId.save();

        res.status(200).json({ message: 'Usuario seguido exitosamente' });

    }catch(err){
        res.status(500).json({message:'Error al intentar seguir al usuario',error: err.message});
    }
}

exports.unfollowUser = async (req, res) => {
    try {
        const { seguidor, seguido } = req.body;


        const seguidorId = await User.findOne({ name: seguidor });
        const seguidoId = await User.findOne({ name: seguido });

        if (!seguidorId || !seguidoId) {
            return res.status(404).json({ message: 'Usuario no encontrado', error:err.message });
        }

        if (!seguidoId.followers.includes(seguidorId._id)) {
            return res.status(400).json({ message: 'No estás siguiendo a este usuario' });
        }

        seguidoId.followers.pull(seguidorId._id);

        seguidorId.following.pull(seguidoId._id);
        await seguidorId.save();
        await seguidoId.save();

        res.status(200).json({ message: 'Has dejado de seguir al usuario' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al intentar dejar de seguir al usuario' });
    }
};



exports.createUser = async (req,res) => {
    try{
        //First we check if the user already exists
        const { name,email,password} = req.body;
        const alreadyRegister = await User.findOne({email})
        console.log(req.body);
        if(alreadyRegister){
            return res.status(400).json({message:"El usuario ya existe"});
        }
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch(err){
        res.status(500).json({ message: 'Error al crear el usuario bla bla bla', error: err.message });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userRegister = await User.findOne({ email });

        if (!userRegister) {
            return res.status(500).json({ message: "Error al hacer login: Usuario no encontrado" });
        }

        const isMatch = await bcrypt.compare(password, userRegister.password);
        if (!isMatch) {
            return res.status(500).json({ message: "Error al hacer login: Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { 
              id: userRegister._id, 
              username: userRegister.name,
              email: userRegister.email,
              profilePicture: userRegister.profilePicture
            }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            user: { id: userRegister._id, username: userRegister.username || userRegister.user, email: userRegister.email }
        });
    } catch (err) {
        res.status(500).json({ message: "Error al hacer login", error: err.message });
    }
};

exports.userInfo = async (req, res) => {
    try {
      // Obtener el username de la query string
      const { username } = req.query;
      const usuario = await User.findOne({ name: username });
      res.status(200).json(usuario);
    } catch (err) {
      res.status(500).json({
        message: "Error al tratar de conseguir la información del usuario",
        error: err.message
      });
    }
  };
  
exports.randomUsers = async (req,res) =>{
    try{
        const randomUsers = await User.aggregate([
            { $sample: { size: 3 } },
          ]);
          res.status(200).json(randomUsers);
    }catch(err){
        res.status(500).json({message:"Error al tratar de conseguir los usuarios recomendados", error:err.message});
    }
}

exports.changeDescription = async (req, res) => {
    try {
        const { username, desc } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Falta el nombre de usuario en el cuerpo de la solicitud' });
        }

        if (!desc) {
            return res.status(400).json({ message: 'Falta la descripción en el cuerpo de la solicitud' });
        }

        const usuario = await User.findOne({ name: username });

        console.log(usuario);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        usuario.description = desc;

        await usuario.save();

        return res.status(200).json({ message: 'Descripción actualizada exitosamente', user: { username, description: desc } });

    } catch (err) {
        return res.status(500).json({ message: "Error al cambiar la descripción", error: err.message });
    }
};

exports.updateProfilePicture = async (req, res) => {
    try {
        const { username } = req.body; // ID del usuario
        if (!req.file || !req.file.path) {
            return res.status(400).json({ message: "No se subió ninguna imagen" });
        }

        const imageUrl = req.file.path;

        console.log(username);
        console.log(imageUrl);

        const user = await User.findOne({ name: username });

        console.log(user);
        console.log("Sigue");
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        user.profilePicture = imageUrl;
        await user.save();

        return res.status(200).json({ message: "Foto de perfil actualizada", profilePicture: imageUrl });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar la foto de perfil", error: error.message });
    }
};