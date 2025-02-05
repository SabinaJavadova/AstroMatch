const Message = require("../models/message");
const mongoose = require("mongoose");
function isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

exports.sendMessage = async (req, res) => {
    const { senderId, receiverId, messageText } = req.body;

    // Əgər ID-lər düzgün formatda deyilsə, səhv mesajı göndəririk
    if (!isValidObjectId(senderId) || !isValidObjectId(receiverId)) {
      return res.status(400).json({ message: "Yanlış ID formatı!" });
    }
  
    try {
      // ID-ləri ObjectId formatına çeviririk
      const sender = new mongoose.Types.ObjectId(senderId);
      const receiver = new mongoose.Types.ObjectId(receiverId);
  
      const newMessage = new Message({
        sender: sender,
        receiver: receiver,
        message: messageText,
      });
  
      await newMessage.save();
      res.status(200).json({ message: "Mesaj göndərildi!" });
    } catch (err) {
      console.error("Mesaj xətası:", err);
      res.status(500).json({ message: "Xəta baş verdi!" });
    }
  };

exports.getMessages = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Yanlış ID formatı!" });
    }

    // İstifadəçinin göndərdiyi və qəbul etdiyi mesajları tapırıq
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender receiver", "name email") // sender və receiver məlumatlarını gətiririk
      .exec();

    res.status(200).json(messages);
  } catch (err) {
    console.error("Mesajları almaq xətası:", err);
    res.status(500).json({ message: "Xəta baş verdi!" });
  }
};
