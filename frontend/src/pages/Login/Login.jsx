import React, { useState, useEffect } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      } catch (error) {
        console.log('Credenciales inválidas. Intenta de nuevo.', error.message);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:3000/api/users/register', { username, email, password });
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/home');
      } catch (error) {
        console.log('Hubo un problema al crear la cuenta. Intenta de nuevo.', error.message);
      }
    }
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login-wrapper">
      <div className="login-image-side" />
      <div className="login-container">
        <h1>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              className="input-field"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            className="input-field"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </button>
        </form>
        <div className="signup">
          <p>
            {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
            <button onClick={toggleForm} className="toggle-button">
              {isLogin ? 'Crea una cuenta' : 'Inicia Sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
