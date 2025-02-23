import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode"; // Tokeni dekodlaşdırmaq üçün

const Chat = () => {
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState("67add614f6bdf287c3cde2c5"); // Qarşı tərəfin id-si

  const handleSendMessage = async () => {
    try {
      // **Tokeni localStorage-dən al**
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token tapılmadı!");
        return;
      }

      // **Tokeni dekodlaşdır və userId-ni senderId kimi istifadə et**
      const decodedToken = jwt_decode(token);
      const senderId = decodedToken.userId; // **User ID-ni senderId kimi al**
      console.log("Decoded Token:", decodedToken);
      console.log("SenderId:", senderId);

      // **Backend-ə göndərilən məlumat**
      const messageData = {
        senderId, // **Burada senderId null olmamalıdır**
        receiverId, // Qarşı tərəfin id-si
        messageText: message,
      };

      console.log("Göndərilən məlumat:", messageData);

      // **Backend-ə POST sorğusu göndər**
      const response = await axios.post(
        "http://localhost:3001/api/messages/send",
        messageData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // **Tokeni göndəririk**
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Mesaj uğurla göndərildi:", response.data);
      setMessage(""); // Mesajı təmizlə
    } catch (error) {
      console.error(
        "Mesaj göndərmə xətası:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Mesajınızı yazın..."
      />
      <button onClick={handleSendMessage}>Göndər</button>
    </div>
  );
};

export default Chat;
