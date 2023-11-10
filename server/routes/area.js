const router = require("express").Router();
const AreaDetails = require("../models/area.js");
const User = require("../models/user.js");
const Joi = require("joi");

const validateArea = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    _podid: Joi.string().required(),
    email: Joi.string().email().required(),
    podemail: Joi.string().email().required(),
    name: Joi.string().required(),
    cords: Joi.array(),
    date: Joi.string().required(),
    time_f: Joi.string().required(),
    time_t: Joi.string().required(),
    repeat: Joi.string().required(),
  });
  return schema.validate(data);
};

router.get("/get/:_id", async (req, res) => {
  try {
    const area = await AreaDetails.findOne({
      _opid: req.params._id,
      _podid: req.params._podid,
    });
    if (area) {
      res.status(201).send(area);
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.get("/getall/:_id", async (req, res) => {
  try {
    const area = await AreaDetails.find(
      { _opid: req.params._id },
      { _podid: 1, name: 1 }
    );
    if (area) {
      res.status(201).send(area);
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.post("/delete", async (req, res) => {
  try {
    await AreaDetails.findOneAndDelete({
      _opid: req.body._opid, _podid: req.body._podid 
    });
    res.status(201).send({ message: "Area deleted successfully " });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { error } = validateArea(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });
    const { firstname, lastname } = await User.findOne({
      email: req.body.podemail,
    }).select({ firstname: 1, lastname: 1 });
    if (firstname === undefined || lastname === undefined)
      return res.status(404).send({ message: "Not found podemail data" });
    await new AreaDetails({
      _opid: req.body._opid,
      _podid: req.body._podid,
      pod_firstname: firstname,
      pod_lastname: lastname,
      name: req.body.name,
      date: req.body.date,
      cords: req.body.cords,
      repeat: req.body.repeat,
      time_from: req.body.time_from,
      time_to: req.body.time_to,
    }).save();
    res.status(201).send({ message: "Area created successfully" });
    console.log("Baza: Dodano Obszar 🗺️");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

module.exports = router;
