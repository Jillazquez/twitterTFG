import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Poster.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    try {
      const decodedToken = jwtDecode(token);
      const response = await axios.post(
        'http://localhost:3000/api/post',
        {
          content,
          author: decodedToken.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      addPost(response.data);
      setContent('');
      toast.success('Post creado correctamente');
      window.location.reload();
    } catch (err) {
      toast.error('Error al publicar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="poster card">
      <textarea
        className="poster__textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="¿Qué está pasando?"
      />
      <div className="poster__footer">
        <button type="submit" className="poster__button">Publicar</button>
      </div>
      {error && <div className="poster__error">{error}</div>}
      <ToastContainer />
    </form>
  );
};

export default Poster;
