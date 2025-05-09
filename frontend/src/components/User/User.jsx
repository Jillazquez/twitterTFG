// User.js
import React from 'react';
import './User.css'; // Estilos para el componente User

const User = ({ username, profilePicture }) => {
    return (
        <div className="user">
            <img src={profilePicture} alt={`${username}'s profile`} className="user__profile-picture" />
            <h2 className="user__username">{username}</h2>
        </div>
    );
};

export default User;
