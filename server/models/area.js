const mongoose = require("mongoose");

const initRegion = new mongoose.Schema({
  latitude: Number,
  latitudeDelta: Number,
  longitude: Number,
  longitudeDelta: Number,
})

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
  initialRegion: initRegion,
  isActive: { type: Boolean, required: true},
  loc_status: { type: Boolean, required: true},
  repeat: { type: Number, required: true },
  time_from: { type: String, required: true },
  time_to: { type: String, required: true },
});

const AreaDetails = mongoose.model("AreaDetails", areaDetails);

module.exports = AreaDetails;