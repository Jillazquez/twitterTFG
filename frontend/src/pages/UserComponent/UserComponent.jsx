import React, { useState, useEffect } from "react";
import "./UserComponent.css";
import { jwtDecode } from "jwt-decode";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Post from "../../components/Post/Post";
import NumberFlow from '@number-flow/react'

const UserComponent = () => {
  const [follower, setFollower] = useState(false);
  const [followers,setFollowers] = useState(0);
  const [description, setDescription] = useState("");
  const [showButton, setShowButton] = useState(true);
  const { username } = useParams();
  const  [ userPfp, setUserPfp] = useState("");
  const [posts, setPosts] = useState([]); 
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    username: "Usuario Desconocido",
    profilePicture: "https://via.placeholder.com/50",
  });

  useEffect(() => {
    fetchPosts();
    getFollowers();
    userInfo();
    //VAMOS A VERIFICAR LOS USER
    console.log("ESTO ES LA VARIABLE USERNAME"+username);
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("ESTO ES EL TOKEN usuario "+decodedToken.username);
        setUser({
          username: decodedToken.username || "Usuario Desconocido",
          profilePicture: decodedToken.profilePicture || "https://via.placeholder.com/50",
        });

        console.log("ESTO es token despues de asignar "+decodedToken.username);
        console.log("ESTO ES EL USER ASIGNADO "+username);
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, []);

  // Función para obtener los posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/post/name/${username}`);
      setPosts(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const userInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/userInfo?username=${username}`);
      console.log(response.data)
      setDescription(response.data.description);
      setUserPfp(response.data.profilePicture);
    } catch (error) {
      console.error("Error al obtener la descripción del usuario", error);
    }
  }


  // Verifica si el perfil en la URL es el mismo que el del usuario logueado
  useEffect(() => {
    if (user.username === username) {
      setShowButton(false); // Oculta el botón si es su propio perfil
    } else {
      setShowButton(true); // Muestra el botón si es un perfil ajeno
    }

    // Verifica si el usuario ya sigue al perfil
    const checkIfFollowing = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/users/isFollowing", {
          seguidor: user.username, // El nombre del usuario logueado (seguidor)
          seguido: username,       // El nombre del perfil que estamos viendo
        });

        setFollower(response.data.isFollowing); // Establece si el usuario ya sigue o no al perfil
      } catch (error) {
        console.error("Error al verificar el estado de seguimiento", error);
      }
    };

    if (user.username !== "Usuario Desconocido" && username !== "Usuario Desconocido") {
      checkIfFollowing();  // Solo hacer la consulta si ambos usernames son válidos
    }
  }, [user.username, username]);

  const handleFollow = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/follow", {
        seguidor: user.username,  // El nombre de usuario logueado (seguidor)
        seguido: username,        // El nombre de usuario a seguir
      });

      getFollowers();
      setFollower(true);  // El usuario ahora sigue al otro
    
    } catch (error) {
      console.error("Error al seguir al usuario", error);
    }
  };

  const getFollowers = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/users/getFollowers", {
        username: username  // Enviar `username` en el cuerpo
      });
      setFollowers(response.data.numFollowers);  // Ajustar al nombre de la respuesta en el backend
    } catch (error) {
      console.error("Error al conseguir número de seguidores", error);
    }
  };
  

  const handleUnfollow = async () => {
    try {
      const response = await axios.delete("http://localhost:3000/api/users/follow", {
        data: {
          seguidor: user.username,
          seguido: username,
        }
      });

      getFollowers();
      setFollower(false);
    
    } catch (error) {
      console.error("Error al dejar de seguir al usuario", error);
    }
  };

  return (
    <div className="user-component">
      {/* Sección superior: información de perfil */}
      <div className="profile-section">
        <img src={userPfp} alt="profile" className="profile-image" />
        <div className="profile-info">
          <h1>{username}</h1>
          <p className="description-text">{description}</p>
          <p className="followers-count">
            <NumberFlow value={followers} /> {followers === 1 ? "follower" : "followers"}
          </p>
          {showButton && (
            <button
              className="btn btn-outline-primary"
              onClick={follower ? handleUnfollow : handleFollow}
            >
              {follower ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
      </div>
  
      {/* Sección inferior: publicaciones */}
      <div className="posts-section">
        <h2 className="posts-title">Publicaciones</h2>
        <div className="home__posts">
          {posts.map((post) => (
            <Post
              key={post._id}
              username={post.author?.name || "Usuario Desconocido"}
              content={post.content}
              timestamp={new Date(post.createdAt).toLocaleString()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserComponent;
