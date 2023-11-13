const mongoose = require("mongoose");

const areaData = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
});

const areaDetails = new mongoose.Schema({
  _opid: { type: String, required: true },
  _podid: { type: String, required: true },
  pod_firstname: { type: String, required: true },
  pod_lastname: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  cords: [areaData],
  repeat: { type: String, required: true },
  time_from: { type: String, required: true },
  time_to: { type: String, required: true },
});

const AreaDetails = mongoose.model("AreaDetails", areaDetails);

module.exports = AreaDetails;