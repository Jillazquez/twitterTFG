import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from "axios";
import './Configurador.css';

const Configurador = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = `${url}/api/user/${currState === "Login" ? "login" : "register"}`;

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      alert("Ocurrió un error. Intenta nuevamente.");
      console.error(err);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState === "Login" ? "Iniciar Sesión" : "Registrarse"}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Cerrar" className="close-icon" />
        </div>

        <div className="login-popup-inputs">
          {currState === "Login" ? null : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Nombre completo"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Correo electrónico"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Contraseña"
            required
          />
        </div>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>Al continuar, aceptas nuestros <strong>términos</strong> y la <strong>política de privacidad</strong>.</p>
        </div>

        <button type="submit" className="login-popup-button">
          {currState === "Sign Up" ? "Crear cuenta" : "Iniciar sesión"}
        </button>

        <p className="login-popup-toggle">
          {currState === "Login"
            ? <>¿No tienes cuenta? <span onClick={() => setCurrState("Sign Up")}>Regístrate aquí</span></>
            : <>¿Ya tienes una cuenta? <span onClick={() => setCurrState("Login")}>Inicia sesión</span></>}
        </p>
      </form>
    </div>
  );
};

export default Configurador;
