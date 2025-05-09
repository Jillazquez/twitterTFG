import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./MessagePage.css";

// Inicializa Socket.IO
const socket = io("http://localhost:3000"); // Cambia por la URL de tu servidor backend

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = [
    { id: 1, name: "Juan", lastMessage: "Hola, ¿cómo estás?" },
    { id: 2, name: "María", lastMessage: "¿Ya viste el documento?" },
    { id: 3, name: "Carlos", lastMessage: "Gracias por el reporte." },
  ];

  const handleChatSelection = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <ChatList chats={chats} onSelectChat={handleChatSelection} />
      </div>
      <div style={styles.main}>
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <p style={styles.placeholder}>Selecciona un chat para comenzar</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", height: "100vh" },
  sidebar: { width: "30%", borderRight: "1px solid #ddd", overflowY: "scroll" },
  main: { width: "70%", padding: "20px" },
  placeholder: { color: "#aaa", textAlign: "center", marginTop: "20px" },
};

export default MessagesPage;
