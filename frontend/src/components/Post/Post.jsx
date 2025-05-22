import React, { useState, useRef, useEffect } from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';

const Post = ({ postId, username, content, timestamp, initialLikes = [], currentUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const menuRef = useRef(null);

  const hasLiked = likes.includes(currentUser);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const reportPost = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/reported-posts', {
        reportedPostId: postId,
        reporter: currentUser, // Este debería ser el ID del usuario logueado
      });
  
      alert('Has denunciado esta publicación.');
      setMenuOpen(false);
    } catch (err) {
      console.error('Error al reportar post:', err.message);
      console.log(err);
      alert('Error al denunciar el post.');
    }
  };
  

  const toggleLike = async () => {
    try {
      const res = await axios.post('http://localhost:3000/api/post/like', {
        postId,
        currentUser,
      });
  
      // Aquí reemplazas completamente los likes con los del backend
      setLikes(res.data.likes);
  
    } catch (err) {
      console.error('Error al dar like:', err.message);
    }
  };
  

  return (
    <div className="post card">
      <div className="post__top">
        <Link to={`/user/${username}`} className="post__username-link">
          <h3 className="post__username">{username}</h3>
        </Link>
        <div className="post__menu-container" ref={menuRef}>
          <BsThreeDots className="post__options" onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && (
            <div className="post__dropdown">
              <button className="post__dropdown-item" onClick={reportPost}>
                Denunciar
              </button>
            </div>
          )}
        </div>
      </div>
      <span className="post__timestamp">{timestamp}</span>
      <p className="post__content">{content}</p>

      {/* Like Button */}
      <div className="post__actions">
        <button className="post__like-button" onClick={toggleLike}>
          {hasLiked ? <AiFillHeart className="liked" /> : <AiOutlineHeart />}
          <span>{likes.length}</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
