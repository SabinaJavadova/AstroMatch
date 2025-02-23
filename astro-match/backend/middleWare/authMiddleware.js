// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  console.log("Header-dən Token:", req.headers.authorization);

  // Burada Bearer və tokeni ayırırıq
  const token = req.headers.authorization?.split(" ")[1]; // Bearer Tokeni ayırırıq
  if (!token) {
    return res.status(401).json({ message: "Token mövcud deyil!" });
  }

  try {
    console.log("JWT Secret:", process.env.JWT_SECRET); // Secret konsolda görmək üçün

    // Tokeni doğrulayırıq
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Tokenin açılmış formasını görmək üçün

    req.userId = decoded.userId; // Tokendən userId-ni alırıq
    next();
  } catch (err) {
    console.error("Token doğrulama xətası:", err);
    return res.status(403).json({ message: "Token etibarsızdır!" });
  }
};

module.exports = { verifyToken };
