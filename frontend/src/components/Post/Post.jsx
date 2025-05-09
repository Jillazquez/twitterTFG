import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import { BsThreeDots } from "react-icons/bs";

const Post = ({ username, content, timestamp }) => {
  return (
    <div className="post">
      <BsThreeDots className='post-puntos'/>
      <div className="post-header">
      <Link to={`/user/${username}`} className="post-username-link">
          {/* Este enlace lleva al perfil del usuario */}
          <h3>{username}</h3>
        </Link>
        <span className="post-timestamp">{timestamp}</span>
      </div>
      <p className="post-content">{content}</p>
    </div>
  );
};

export default Post;
