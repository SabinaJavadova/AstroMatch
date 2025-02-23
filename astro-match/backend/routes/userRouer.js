const express = require("express");
const { getUserMatches } = require("../controllers/userController"); 
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user/matches", verifyToken, getUserMatches); // Uyğunlaşmaları əldə etmək

module.exports = router;
