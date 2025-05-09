import React, { useState } from "react";
import axios from "axios";
import "./LoginPopup.css";
import '../../assets/assets';
import { assets } from "../../assets/assets";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginPopup = ({ currentUsername, currentProfilePicture, onUpdateProfile, setShowPopup }) => {
  const [selectedOption, setSelectedOption] = useState("profileImage"); // Opción seleccionada
  const [newUsername, setNewUsername] = useState(currentUsername);
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedOption === "description") {
      try {
        const response = await axios.post('http://localhost:3000/api/users/changeDescription', {
          username: newUsername,
          desc: newDescription
        });
        console.log("primero");

        await toast.success("Perfil actualizado correctamente");
        setShowPopup(false);
        console.log("Segundo")
      } catch (error) {
        console.error("Error cambiando la descripción", error);
        toast.error("Error al actualizar la descripción");
      }
    } else if (selectedOption === "profileImage") {
      if (!newImage) {
        toast.error("Selecciona una imagen primero");
        return;
      }
      try {
        const formData = new FormData();
        // El nombre "profilePicture" debe coincidir con el que espera Multer en el backend
        formData.append("profilePicture", newImage);
        // Si necesitas identificar al usuario, puedes enviar también el username
        formData.append("username", newUsername);

        const response = await axios.post(
          'http://localhost:3000/api/users/updateProfilePicture',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        toast.success("Foto de perfil actualizada correctamente");
        setShowPopup(false);
      } catch (error) {
        console.error("Error actualizando la foto de perfil", error);
        toast.error("Error al actualizar la foto de perfil");
      }
    } else if (selectedOption === "username") {
      // Aquí podrías implementar la actualización del username
      // Por ejemplo, enviar una petición similar a la de la descripción
    }
  };

  return (
    <div className="popup-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="popup-content">
        <img
          onClick={() => setShowPopup(false)}
          className="popup-cross"
          src={assets.cross_icon}
          alt="Cerrar"
        />
        <h2>Editar Perfil</h2>
        <div className="popup-body">
          {/* Sección izquierda: Botones de opciones */}
          <div className="popup-options">
            <button
              onClick={() => setSelectedOption("profileImage")}
              className={selectedOption === "profileImage" ? "active" : ""}
            >
              Imagen de Perfil
            </button>
            <button
              onClick={() => setSelectedOption("username")}
              className={selectedOption === "username" ? "active" : ""}
            >
              Nombre de Usuario
            </button>
            <button
              onClick={() => setSelectedOption("description")}
              className={selectedOption === "description" ? "active" : ""}
            >
              Descripción
            </button>
          </div>

          {/* Sección derecha: Formulario según la opción seleccionada */}
          <div className="popup-form">
            {selectedOption === "profileImage" && (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Imagen de Perfil</label>
                  <input
                    type="file"
                    onChange={(e) => setNewImage(e.target.files[0])}
                    accept="image/*"
                  />
                  <img
                    src={
                      newImage
                        ? URL.createObjectURL(newImage)
                        : currentProfilePicture
                    }
                    alt="Imagen de perfil"
                    className="preview-img"
                  />
                </div>
                <button type="submit" className="submit-button">
                  Guardar Cambios
                </button>
              </form>
            )}

            {selectedOption === "username" && (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nombre de Usuario</label>
                  <input
                    type="text"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Nuevo nombre de usuario"
                  />
                </div>
                <button type="submit" className="submit-button">
                  Guardar Cambios
                </button>
              </form>
            )}

            {selectedOption === "description" && (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Escribe tu nueva descripción"
                    rows="4"
                  />
                </div>
                <button type="submit" className="submit-button">
                  Guardar Cambios
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
