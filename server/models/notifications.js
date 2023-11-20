const mongoose = require("mongoose")

const notiData = new mongoose.Schema({
    title: String,
    _podid: String,
    firstname: String,
    lastname: String,
    details: String,
    areaname: String,
    date: String,
    seen: Boolean
})

const notiUserSchema = new mongoose.Schema({
  _opid: { type: String, required: true},
  notifications: [notiData],
})
const Notifications = mongoose.model("Notifications", notiUserSchema);

module.exports = Notifications
