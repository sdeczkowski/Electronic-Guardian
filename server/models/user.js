const mongoose = require("mongoose")

// tabela user
const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  isActive: { type: Boolean, required: true },
})
const User = mongoose.model("User", userSchema);

module.exports = User
