const Message = require("../models/message");
const mongoose = require("mongoose");

const sendMessage = async (req, res, io) => {
  const { senderId, receiverId, message } = req.body;

  console.log("Received data:", req.body); // Göndərilən məlumatı yoxlayın

  if (!senderId || !receiverId || !message) {
    return res.status(400).json({ message: "Bütün sahələr tələb olunur!" });
  }

  try {
    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message: message,
    });

    await newMessage.save();
    console.log("Mesaj bazaya göndərildi:", newMessage);

    io.to(receiverId).emit("receive_message", {
      senderId,
      message,
    });

    res.status(201).json({ message: "Mesaj uğurla göndərildi!" });
  } catch (err) {
    console.error("Mesaj göndərmə xətası:", err);
    res.status(500).json({ message: "Daxili server xətası!" });
  }
};

const getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Yanlış ID formatı!" });
    }

    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "name email")
      .populate("receiver", "name email")
      .exec();

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Xəta baş verdi!" });
  }
};

module.exports = { sendMessage, getMessages };