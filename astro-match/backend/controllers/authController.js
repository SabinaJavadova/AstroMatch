const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const calculateZodiac = require("../utils/calculateZodiac");

exports.register = async (req, res) => {
  console.log("Gələn məlumat:", req.body);

  const { username, email, password, birthDate } = req.body;

  // Lazım olan məlumatları yoxlayırıq
  if (!username || !email || !birthDate || !password) {
    return res.status(400).json({ message: "Bütün sahələr doldurulmalıdır!" });
  }

  try {
    // Doğum tarixini düzgün formatda yoxlayırıq
    const parsedDate = new Date(birthDate);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Yanlış doğum tarixi formatı!" });
    }

    const age = new Date().getFullYear() - parsedDate.getFullYear();
    const zodiacSign = calculateZodiac(parsedDate); // Bürcü hesablayırıq

    console.log(`✅ Doğum tarixi: ${birthDate}, Bürc: ${zodiacSign}`);

    // E-poçtun daha öncə istifadə olunmadığını yoxlayırıq
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "E-poçt artıq istifadə olunur!" });
    }

    // Şifrəni təhlükəsiz şəkildə şifrələyirik
    const hashedPassword = await bcrypt.hash(password, 11);

    // Yeni istifadəçini yaradıq
    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
      birthDate,
      zodiacSign,
      age,
    });

    await newUser.save();

    // JWT tokeni yaradırıq
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // JSON cavabında token və istifadəçi məlumatlarını göndəririk
    return res.status(201).json({
      message: "Qeydiyyat uğurlu oldu!",
      token, // Tokeni frontend-ə göndəririk
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        zodiacSign: newUser.zodiacSign,
        age: newUser.age,
      },
    });
  } catch (error) {
    console.error("Qeydiyyat xətası:", error);
    return res.status(500).json({ message: "Xəta baş verdi!" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "İstifadəçi tapılmadı!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Şifrə səhvdir!" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: false });

    res.status(200).json({ message: "Giriş uğurlu oldu!", token });
  } catch (error) {
    console.error("Giriş xətası:", error);
    res.status(500).json({ message: "Xəta baş verdi!" });
  }
};
