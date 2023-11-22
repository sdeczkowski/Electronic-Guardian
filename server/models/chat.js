const mongoose = require("mongoose")

const user = new mongoose.Schema({
  _id: String
})

const message_data = new mongoose.Schema({
    _id: String,
    text: String,
    createdAt: Date,
    user: user
})

const ChatSchema = new mongoose.Schema({
  _id1: { type: String, required: true},
  _id2: { type: String, required: true},
  message: [message_data],
})
const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat
