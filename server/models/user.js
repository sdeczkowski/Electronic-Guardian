const mongoose = require("mongoose")

const podLocation = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
})

const podSchema = new mongoose.Schema({
  _podid: String,
  firstname: String,
  lastname: String,
})

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  type: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  opCode: {type: String, required: false},
  pods: [podSchema],
  location: podLocation,
  location_date: {type: Date, required: false},
})
const User = mongoose.model("User", userSchema);

module.exports = User
