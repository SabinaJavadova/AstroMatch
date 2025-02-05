const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use("/", messageRoutes); 
// Route-ları əlavə edirik
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3000;

mongoose.connect(DB_URL).then(() => {
  console.log("Connected to MongoDB!");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});
