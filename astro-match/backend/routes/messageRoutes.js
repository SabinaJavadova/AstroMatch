const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/send", verifyToken, sendMessage);

router.get("/messages/:userId", verifyToken, getMessages);

module.exports = router;
