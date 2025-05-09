import React from 'react';
import './RandomUser.css';
import { Link } from 'react-router-dom';

const RandomUser = ({ username, description, profilePicture }) => {
  return (
    <div className="user-recommendation">
      <img src={profilePicture} alt={`${username}'s profile`} className="profile-picture rounded-circle" />
      <div className="user-details">
      <Link to={`/user/${username}`} className="post-username-link">
          {/* Este enlace lleva al perfil del usuario */}
          <h5 className='username'>{username}</h5>
        </Link>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default RandomUser;
