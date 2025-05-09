import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Mi Red Social</h3>
      <nav>
        <a href="#inicio">Inicio</a>
        <a href="#explorar">Explorar</a>
        <a href="#perfil">Perfil</a>
        <a href="#mensajes">Mensajes</a>
      </nav>
    </div>
  );
};

export default Sidebar;
