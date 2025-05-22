import React from "react";
import { BsHouse, BsEnvelope, BsPerson, BsGear } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = ({ onLogout, setShowPopup, username }) => {
  return (
    <div className="sidebar">
      <ul className="menu">
        <li className="menu-item">
          <BsHouse className="icon" />
          <Link className="text" to="/home">Inicio</Link>
        </li>
        <li className="menu-item">
          <BsPerson className="icon" />
          <Link className="text" to={`/user/${username}`}>Perfil</Link>
        </li>
        <li className="menu-item" onClick={() => setShowPopup(true)}>
          <BsGear className="icon" />
          <span className="text">Configuración</span>
        </li>
      </ul>
      <button className="logout-button" onClick={onLogout}>Cerrar sesión</button>
    </div>
  );
};

export default EditProfile;
