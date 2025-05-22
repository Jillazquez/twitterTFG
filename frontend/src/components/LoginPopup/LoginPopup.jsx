import React, { useState } from "react";
import axios from "axios";
import "./LoginPopup.css";
import '../../assets/assets';
import { assets } from "../../assets/assets";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPopup = ({ currentUsername, currentProfilePicture, onUpdateProfile, setShowPopup }) => {
  const [selectedOption, setSelectedOption] = useState("profileImage");
  const [newUsername, setNewUsername] = useState(currentUsername);
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedOption === "description") {
        console.log("test");
        toast.error("Descripción actualizada correctamente");
        await axios.post('http://localhost:3000/api/users/changeDescription', {
          username: newUsername,
          desc: newDescription
        });
      } else if (selectedOption === "profileImage") {
        if (!newImage) return toast.error("Selecciona una imagen");

        const formData = new FormData();
        formData.append("profilePicture", newImage);
        formData.append("username", newUsername);

        await axios.post('http://localhost:3000/api/users/updateProfilePicture', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        toast.success("Foto de perfil actualizada correctamente");
      } else if (selectedOption === "username") {
        // Aquí se puede agregar lógica para actualizar el username
      }

      setShowPopup(false);
    } catch (error) {
      console.error("Error al actualizar perfil", error);
      toast.error("Error al actualizar el perfil");
    }
  };

  const handleImageSelect = (e) => {
    setNewImage(e.target.files[0]);
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

          <div className="popup-form">
            {selectedOption === "profileImage" && (
              <form onSubmit={handleSubmit} className="form-group">
                <label className="image-upload-box">
                  {!newImage ? (
                    <span className="image-upload-text">Arrastra o selecciona una imagen</span>
                  ) : (
                    <img
                      src={URL.createObjectURL(newImage)}
                      alt="Vista previa"
                      className="preview-img"
                    />
                  )}
                  <input
                    type="file"
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="file-input"
                  />
                </label>

                <button type="submit" className="submit-button">
                  Guardar Cambios
                </button>
              </form>
            )}

            {selectedOption === "username" && (
              <form onSubmit={handleSubmit} className="form-group">
                <label>Nuevo nombre de usuario</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <button type="submit" className="submit-button">
                  Guardar Cambios
                </button>
              </form>
            )}

            {selectedOption === "description" && (
              <form onSubmit={handleSubmit} className="form-group">
                <label>Nueva descripción</label>
                <textarea
                  rows="4"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
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
