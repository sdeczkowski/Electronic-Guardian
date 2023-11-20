const router = require("express").Router();
const Notifications = require("../models/notifications.js");
const User = require("../models/user.js");
const Joi = require("joi");

const validateNotificationAdd = (data) => {
  const schema = Joi.object({
    _opid: Joi.string().required(),
    _podid: Joi.string().required(),
    title: Joi.string().required(),
    areaname: Joi.string().required(),
    details: Joi.string().required(),
    date: Joi.string().required(),
  });
  return schema.validate(data);
};

const validateNotificationID = (data) => {
  const schema = Joi.object({
    _opid: Joi.string().required(),
  });
  return schema.validate(data);
};

router.get("/get/:_id", async (req, res) => {
  try {
    const notifications = await Notifications.findOne({
      _opid: req.params._id,
    });
    if (notifications) {
      res.status(201).send(notifications);
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
    const { error } = validateNotificationID(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const notifications = await Notifications.findOne({
      _opid: req.body._opid,
    });
    if (notifications) {
      await Notifications.findOneAndUpdate({ _opid: req.body._opid }, { $set: { notifications: [] } });
      res.status(201).send({ message: "Notifications deleted successfully 😬" });
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.post("/seen", async (req, res) => {
  try {
    const { error } = validateNotificationID(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const notifications = await Notifications.findOne({
      _opid: req.body._opid,
    });
    if (notifications) {
      await Notifications.findOneAndUpdate(
        { _opid: req.body._opid },
        { $set: { "notifications.$[].seen": true } },
        { multi: true }
      );
      res.status(201).send({ message: "Notifications marked as seen" });
      console.log("Baza: Powiadomienia oznaczone jako przeczytane 👀");
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const { error } = validateNotificationAdd(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const { firstname, lastname } = await User.findOne({
      _id: req.body._podid,
    }).select({ firstname: 1, lastname: 1 });
    if (firstname === undefined || lastname === undefined)
      return res.status(404).send({ message: "Not found pod data" });
    const notification = await Notifications.findOne({ _opid: req.body._opid });
    if (notification) {
      await Notifications.updateOne(
        { _opid: req.body._opid },
        {
          $push: {
            notifications: {
              title: req.body.title,
              firstname: firstname,
              lastname: lastname,
              details: req.body.details,
              areaname: req.body.areaname,
              date: req.body.date,
              seen: false,
            },
          },
        }
      );
      res.status(201).send({ message: "Notification added successfully" });
      console.log("Baza: Dodano powiadomienie do dokumentu 💫");
    } else {
      await new Notifications({
        _opid: req.body._opid,
        notifications: [
          {
            title: req.body.title,
            firstname: firstname,
            lastname: lastname,
            details: req.body.details,
            areaname: req.body.areaname,
            date: req.body.date,
            seen: false,
          },
        ],
      }).save();
      res.status(201).send({ message: "Notification created successfully" });
      console.log("Baza: Dodano powiadomienie 🚩");
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

module.exports = router;
