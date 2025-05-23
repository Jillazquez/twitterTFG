import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Post from "../../components/Post/Post";
import Poster from "../../components/Poster/Poster";
import User from "../../components/User/User";
import EditProfile from "../../components/EditProfile/EditProfile";
import RandomUser from "../../components/RandomUser/RandomUser";
import Loginpopup from "../../components/LoginPopup/LoginPopup";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [randomUsers, setRandomUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState({
    username: "Usuario Desconocido",
    profilePicture: "https://via.placeholder.com/50",
  });

  const handleLogout = () => {  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/post");
      setPosts(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
    localStorage.removeItem("token");
    window.location.reload();
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/post");
      setPosts(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users/getRandomUsers");
      setRandomUsers(res.data);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchRandomUsers();

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          username: decoded.username || "Usuario Desconocido",
          profilePicture: decoded.profilePicture || "https://via.placeholder.com/50",
        });
      } catch (err) {
        console.error("Error al decodificar el token", err);
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (error) return <div>{error.toString()}</div>;

  return (
    <div className="layout">
      {/* Lado izquierdo */}
      <aside className="sidebar">
        <EditProfile
          onLogout={handleLogout}
          username={user.username}
          setShowPopup={setShowPopup}
        />
      </aside>
  
      {/* Centro - feed */}
      <main className="home">
        <div className="home__header">
          <h1>Inicio</h1>
          {showPopup && (
            <Loginpopup
              setShowPopup={setShowPopup}
              currentUsername={user.username}
            />
          )}
        </div>
  
  
        <Poster addPost={(newPost) => setPosts([newPost, ...posts])} />
  
        <div className="home__posts">
        {posts.map(post => (
          <Post
            key={post._id}
            postId={post._id}
            username={post.author.name}
            content={post.content}
            timestamp={new Date(post.createdAt).toLocaleString()}
            initialLikes={post.likes} 
            currentUser={user.username}
          />
        ))}

        </div>
      </main>
  
      {/* Lado derecho - usuarios recomendados */}
      <aside className="rightbar">
        <h3 className="rightbar-title">Usuarios sugeridos</h3>
        <div className="randomUsers">
          {randomUsers.map((u) => (
            <RandomUser
              key={u._id}
              username={u.name}
              description={u.description}
              profilePicture={u.profilePicture}
            />
          ))}
        </div>
      </aside>
    </div>
  );
};  

export default Home;
