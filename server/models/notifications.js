const mongoose = require("mongoose")

const notiData = new mongoose.Schema({
    name: String,
    details: String,
    date: String
})

const notiUserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  notifications: [notiData],
})
const Notifications = mongoose.model("Notifications", notiUserSchema);

module.exports = Notifications
