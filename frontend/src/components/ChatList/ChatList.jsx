import React from "react";

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <ul style={styles.list}>
      {chats.map((chat) => (
        <li
          key={chat.id}
          style={styles.item}
          onClick={() => onSelectChat(chat)}
        >
          <p style={styles.name}>{chat.name}</p>
          <p style={styles.message}>{chat.lastMessage}</p>
        </li>
      ))}
    </ul>
  );
};

const styles = {
  list: { listStyle: "none", padding: 0 },
  item: {
    padding: "15px",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
  },
  name: { fontWeight: "bold", margin: 0 },
  message: { color: "#666", margin: 0, fontSize: "0.9em" },
};

export default ChatList;
