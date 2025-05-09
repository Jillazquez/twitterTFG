import React from "react";

const ChatWindow = ({ chat }) => {
  return (
    <div>
      <h2>Chat con {chat.name}</h2>
      <div style={styles.chatBox}>
        {/* Aquí podrías añadir los mensajes */}
        <p style={styles.message}>Este es un chat con {chat.name}</p>
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Escribe un mensaje"
          style={styles.input}
        />
        <button style={styles.button}>Enviar</button>
      </div>
    </div>
  );
};

const styles = {
  chatBox: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "15px",
    height: "400px",
    overflowY: "scroll",
  },
  message: { margin: "10px 0" },
  inputContainer: { display: "flex", marginTop: "20px" },
  input: { flex: 1, padding: "10px", marginRight: "10px", borderRadius: "5px" },
  button: { padding: "10px 20px", borderRadius: "5px", cursor: "pointer" },
};

export default ChatWindow;
