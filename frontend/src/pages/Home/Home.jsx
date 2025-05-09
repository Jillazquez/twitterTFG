import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Post from "../../components/Post/Post";
import Poster from "../../components/Poster/Poster";
import User from "../../components/User/User";
import "./Home.css";
import EditProfile from "../../components/EditProfile/EditProfile";
import RandomUser from "../../components/RandomUser/RandomUser";
import Loginpopup from "../../components/LoginPopup/LoginPopup";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup,setShowPopup] = useState(false);
  const [user, setUser] = useState({
    // Inicializa el estado del usuario
    username: "Usuario Desconocido",
    profilePicture: "https://via.placeholder.com/50",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  // Función get posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post");
      setPosts(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  //Function to fetch the 3 random users
  const fetchRandomUsers = async () => {
    try{
      const response = await axios.get("http://localhost:3000/api/users/getRandomUsers");
      setRandomUsers(response.data);
    }catch(err){
      setError(err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchRandomUsers();
    const token = localStorage.getItem("token"); //Get token
    console.log(token);

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);

        setUser({
          username: decodedToken.username || "Usuario Desconocido",
          profilePicture:
            decodedToken.profilePicture || "https://via.placeholder.com/50",
        });
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) return <div>{error.toString()}</div>;


  return (
    <div className="layout">
      {/* Menú lateral */}
      <aside className="sidebar">
        <EditProfile onLogout={handleLogout} username={user.username} setShowPopup={setShowPopup} />
      </aside>
  
      {/* Contenido principal */}
      <main className="home">
        <div className="home__header">
          <h1>Inicio</h1>
          {showPopup ? <Loginpopup setShowPopup={setShowPopup} currentUsername={user.username} /> : null}

          
        </div>
        <User username={user.username} profilePicture={user.profilePicture} />
        <div className="randomUsers border border-primary rounded">
          {randomUsers.map((randomUsers) => (
            <RandomUser
              key={randomUsers.__id}
              username={randomUsers.name}
              description={randomUsers.description}
              profilePicture={randomUsers.profilePicture}
            />
          ))}
        </div>
        <Poster addPost={(newPost) => setPosts([newPost, ...posts])} />
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
      </main>
    </div>
  );
  
};

export default Home;
