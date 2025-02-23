import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Chat.scss";

const Chat = () => {
  const { id: receiverId } = useParams(); // URL-dən alıcı ID-sini götürürük
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/messages/${receiverId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMessages(response.data);
      } catch (err) {
        console.error("Mesajları almaq xətası:", err);
      }
    };

    fetchMessages();
  }, [receiverId, token]);

  const handleSendMessage = async () => {
    try {
      const senderId = localStorage.getItem("userId"); // Sender ID-ni buradan alırıq
      const messageData = {
        senderId,
        receiverId, // Burada matchId əvəzinə receiverId istifadə edirik
        messageText: newMessage,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Mesajı göndəririk
      await axios.post(
        "http://localhost:3001/api/messages/send",
        messageData,
        config
      );

      // Mesaj göndərildikdən sonra inputu təmizləyirik və yeni mesajları çəkirik
      setNewMessage("");
      const response = await axios.get(
        `http://localhost:3001/api/messages/${receiverId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(response.data);
    } catch (err) {
      console.error("Mesaj göndərmə xətası:", err);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <h2>Mesajlaşma</h2>
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender._id === localStorage.getItem("userId")
                  ? "sent"
                  : "received"
              }`}
            >
              {msg.message}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Mesajınızı yazın..."
          />
          <button onClick={handleSendMessage}>Göndər</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
