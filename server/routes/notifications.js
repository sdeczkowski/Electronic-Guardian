const router = require("express").Router();
const Notifications = require("../models/notifications.js");
const User = require("../models/user.js");
const Joi = require("joi");

const validateNotificationAdd = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    title: Joi.string().required(),
    podemail: Joi.string().email().required(),
    details: Joi.string().required(),
    date: Joi.string().required(),
  });
  return schema.validate(data);
};

const validateNotificationEmail = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  return schema.validate(data);
};

router.get("/get", async (req, res) => {
  try {
    const { error } = validateNotificationEmail(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const notifications = await Notifications.findOne({
      email: req.body.email,
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

router.delete("/delete", async (req, res) => {
  try {
    const { error } = validateNotificationEmail(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const notifications = await Notifications.findOne({
      email: req.body.email,
    });
    if (notifications) {
      await Notifications.findOneAndUpdate({ email: req.body.email}, { $set: {notifications: {}}})
      res.status(201).send({ message: "Notifications deleted successfully" });
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
    const notification = await Notifications.findOne({ email: req.body.email });
    if (notification) {
      const {firstname, lastname} = await User.findOne({ email: req.body.podemail }).select({"firstname": 1, "lastname": 1})
      if (firstname === undefined || lastname === undefined) return res.status(404).send({ message: "Not found podemail data" });
      await Notifications.updateOne(
        { email: req.body.email },
        {
          $push: {
            notifications: 
            {
              title: req.body.title,
              podemail: req.body.podemail,
              firstname: firstname,
              lastname: lastname,
              details: req.body.details,
              date: req.body.date,
            },
          },
        }
      );
      res.status(201).send({ message: "Notification added successfully" });
      console.log("Baza: Dodano powiadomienie do dokumentu 💫");
    } else {
      const {firstname, lastname} = await User.findOne({ email: req.body.podemail }).select({"firstname": 1, "lastname": 1})
      if (firstname === undefined || lastname === undefined) return res.status(404).send({ message: "Not found podemail data"  });
      await new Notifications({
        email: req.body.email,
        notifications: [
          {
            title: req.body.title,
            podemail: req.body.podemail,
            firstname: firstname,
            lastname: lastname,
            details: req.body.details,
            date: req.body.date,
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
