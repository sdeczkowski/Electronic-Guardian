const router = require("express").Router();
const User = require("../models/user.js");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const passwordComplexity = require("joi-password-complexity");

const validateCode = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    code: Joi.string().required(),
  });
  return schema.validate(data);
};

const validateNewPass = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    password: Joi.string().required(),
    new_password: Joi.string().required(),
  });
  return schema.validate(data);
};

const validateNewEmail = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    email: Joi.string().required(),
    new_email: Joi.string().required(),
  });
  return schema.validate(data);
};

router.get("/code/:_id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params._id });
    if (user) {
      res.status(201).send(user.opCode);
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.get("/podloc/:_id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params._id });
    if (user) {
      res.status(201).send({location:{ latitude: user.location.latitude, longitude: user.location.longitude }, location_date: user.location_date});
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.get("/getpods/:_id", async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params._id,
    });
    if (user) {
      res.status(201).send(user.pods);
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.post("/addpod", async (req, res) => {
  try {
    const { error } = validateCode(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const { firstname, lastname } = await User.findOne({
      _id: req.body._id,
    }).select({ firstname: 1, lastname: 1 });

    const user = await User.findOne({ opCode: req.body.code });
    if (!user) return res.status(401).send({ message: "Błędny kod" });
    const user_code = await User.findOne({ opCode: req.body.code, "pods._podid": req.body._id });
    console.log(user_code);
    if (user_code) return res.status(401).send({ message: "Jesteś przypisany do podanego użytkownika" });

    await User.updateOne(
      { _id: user._id },
      {
        $push: {
          pods: {
            _podid: req.body._id,
            firstname: firstname,
            lastname: lastname,
          },
        },
      }
    );
    res.status(201).send({ message: "Pod added successfully" });
    console.log("Baza: Dodano Podopiecznego do Opiekuna 😇");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.post("/updateloc", async (req, res) => {
  try {
    const date = new Date();
    await User.updateOne(
      { _id: req.body._id },
      {
        $set: {
          location: {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
          },
          location_date: date,
        },
      }
    );
    res.status(201).send({ message: "Notification added successfully" });
    console.log("Baza: Zakutalizowano lokalizacje 💫");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.post("/updatepass", async (req, res) => {
  try {
    const { error } = validateNewPass(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ _id: req.body._id });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Błędne hasło" });
    let complexityHandler = passwordComplexity().validate(req.body.new_password);
    if (complexityHandler.error)
      return res.status(409).send({
        message: "Nowe hasło powinno mieć min. 8 znaków, cyfrę, dużą litere oraz symbol",
      });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.new_password, salt);

    await User.updateOne(
      { _id: req.body._id },
      {
        $set: {
          password: hashPassword,
        },
      }
    );
    res.status(201).send({ message: "Password updated successfully" });
    console.log("Baza: Zakutalizowano hasło 😐");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.post("/updatemail", async (req, res) => {
  try {
    const { error } = validateNewEmail(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const user = await User.findOne({ _id: req.body._id });
    if (req.body.new_email === user.email) return res.status(401).send({ message: "Błędny email" });
    const useremail = await User.findOne({ email: req.body.new_email });
    if (useremail) return res.status(401).send({ message: "Inny użytkownik przypisał już ten email" });
    await User.updateOne(
      { _id: req.body._id },
      {
        $set: {
          email: req.body.new_email,
        },
      }
    );
    res.status(201).send({ message: "Email updated successfully" });
    console.log("Baza: Zakutalizowano email 😐");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

module.exports = router;
