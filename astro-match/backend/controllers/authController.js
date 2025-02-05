const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const calculateZodiac = require("../utils/calculateZodiac");

exports.register = async (req, res) => {
  const { name, email, password, birthDate, age } = req.body;
  try {
    const zodiacSign = calculateZodiac(birthDate);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "E-poçt artıq istifadə olunur!" });
    }
    const hashedPassword = await bcrypt.hash(password, 11);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      zodiacSign,
      age,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, secure: false });

    res.status(201).json({ message: "Qeydiyyat uğurlu oldu!" });
  } catch (error) {
    console.error("Qeydiyyat xətası:", error);
    res.status(500).json({ message: "Xəta baş verdi!" });
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

    res.status(200).json({ message: "Giriş uğurlu oldu!" });
  } catch (error) {
    console.error("Giriş xətası:", error);
    res.status(500).json({ message: "Xəta baş verdi!" });
  }
};

