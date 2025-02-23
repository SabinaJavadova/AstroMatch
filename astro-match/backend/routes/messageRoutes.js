const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messageController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send", verifyToken, (req, res) => {
  const io = req.app.get("io");  // socket.io-ya müraciət etmək
  sendMessage(req, res, io);  // Socket.IO ilə mesaj göndəririk
});
router.get("/:userId", verifyToken, getMessages);
module.exports = router;
