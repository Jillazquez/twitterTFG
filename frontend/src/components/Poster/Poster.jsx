import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode"; // Asegúrate de no usar destructuración aquí
import './Poster.css'; // Archivo de estilos para Poster
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Poster = ({ addPost }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setError('No se encontró el token de autenticación.');
      return;
    }

    if (content.trim() === '') return;

    // Decodificar el token para obtener el username
    const decodedToken = jwtDecode(token);

    
    console.log(decodedToken.id)
    try {
      // Enviar el post al backend con el token en el header
      const response = await axios.post('http://localhost:3000/api/post', {
        content,
        author: decodedToken.id // Obtener el username desde el token decodificado
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Asegurarse de enviar el token en el header
        }
      });

      // Si se creó correctamente el post
      addPost(response.data); 
      setContent(''); // Limpiar el textarea
      toast.success('Post creado correctamente');
    } catch (err) {
      toast.error(response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="poster">
      <textarea
        className="poster__textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="¿Qué está pasando?"
      />
      <div className="poster__footer">
        <button type="submit" className="poster__button">Twittear</button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Poster;
