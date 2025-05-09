import React, { useState } from "react";
import { BsHouse, BsEnvelope, BsPerson, BsGear } from "react-icons/bs";
import { Link } from 'react-router-dom';

const EditProfile = ({ onLogout, onChangeImage, username,setShowPopup }) => {


  return (
    <div style={styles.sidebar}>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>
          <BsHouse style={styles.icon} />
          <span style={styles.text}><Link className="link" to={`/home`}>Inicio</Link></span>
        </li>
        <li style={styles.menuItem}>
          <BsEnvelope style={styles.icon} />
          <span style={styles.text}><Link className="link" to={`/chat`}>Mensajes</Link></span>
        </li>
        <li style={styles.menuItem}>
          <BsPerson style={styles.icon} />
          <span style={styles.text}><Link className="link" to={`/user/${username}`}>Perfil</Link></span>
        </li>

        <li  style={styles.menuItem}>
          <BsGear style={styles.icon} />
          <span onClick={()=>{
        setShowPopup(true);
      }} style={styles.text}>Configuracion</span>
        </li>

      </ul>
      <button style={styles.logoutButton} onClick={onLogout}>
        Cerrar sesión
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "230px",
    height: "100vh",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e6e6e6",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  },
  menu: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 0",
    cursor: "pointer",
    color: "#333",
    fontSize: "18px",
    transition: "background-color 0.3s",
  },
  menuItemHover: {
    backgroundColor: "#f5f5f5",
  },
  icon: {
    marginRight: "10px",
    fontSize: "20px",
  },
  text: {
    fontSize: "16px",
  },
  buttonAsText: {
    all: "unset",
    fontSize: "16px",
    color: "inherit",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  logoutButton: {
    marginTop: "550px",
    padding: "10px 20px",
    backgroundColor: "#ff4d4f",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default EditProfile;
