import React, { useState, useRef, useEffect } from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';

const Post = ({ username, content, timestamp }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
              <button className="post__dropdown-item" onClick={() => alert('Has denunciado esta publicación.')}>
                Denunciar
              </button>
            </div>
          )}
        </div>
      </div>
      <span className="post__timestamp">{timestamp}</span>
      <p className="post__content">{content}</p>
    </div>
  );
};

export default Post;
