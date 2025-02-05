const mongoose = require("mongoose");
const { Schema } = mongoose;


const messageSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
      },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
