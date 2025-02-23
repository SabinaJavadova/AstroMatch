// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIo = require("socket.io");

const userRoutes = require("./routes/userRouer");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config(); // Enviroment faylını oxuyuruq
const app = express();
const server = http.createServer(app); // HTTP server yaratmaq

const io = socketIo(server); // Socket.IO serverini yaratmaq

const corsOptions = {
  origin: "http://localhost:5173", // Frontend serverinin URL-i
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/messages", messageRoutes); // Mesaj API-larını buraya əlavə edirik
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3001;

// Socket.IO bağlantısını qururuq
io.on("connection", (socket) => {
  console.log("Yeni istifadəçi qoşuldu:", socket.id);

  // İstifadəçi öz ID-si ilə kanalına qoşulur
  socket.on("join", (userId) => {
    socket.join(userId); // İstifadəçini öz ID-si ilə "room"a daxil edirik
    console.log(`${userId} adlı istifadəçi daxil oldu.`);
  });

  // Bağlantı kəsildikdə istifadəçini çıxarırıq
  socket.on("disconnect", () => {
    console.log("İstifadəçi çıxdı.");
  });
});

// Mesaj göndərmək üçün API endpoint-i
app.post("/api/messages/send", (req, res) => {
  const { senderId, receiverId, message } = req.body;

  // Bütün məlumatlar mövcudsa, Socket.IO ilə mesajı göndəririk
  if (senderId && receiverId && message) {
    io.to(receiverId).emit("receive_message", { senderId, message });

    res.status(200).json({ message: "Mesaj uğurla göndərildi!" });
  } else {
    res.status(400).json({ message: "Bütün məlumatlar tələb olunur!" });
  }
});

// Serveri başlatırıq
server.listen(PORT, () => {
  console.log(`Server ${PORT} portunda işləyir`);
});

mongoose.connect(DB_URL).then(() => {
  console.log("Connected to MongoDB!");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});
