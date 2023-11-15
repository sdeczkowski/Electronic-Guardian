const router = require("express").Router();
const User = require("../models/user.js");
const Joi = require("joi");

const validateCode = (data) => {
  const schema = Joi.object({
    _id: Joi.string().required(),
    code: Joi.string().required()
  });
  return schema.validate(data);
};

router.get("/code/:_id", async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params._id})
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
    const user = await User.findOne({_id: req.params._id})
    if (user) {
      res.status(201).send({latitude: user.location.latitude, longitude: user.location.longitude});
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
    
    const user = await User.findOne({ opCode: req.body.code })
    if (!user) return res.status(401).send({ message: "Błędny kod" });
    const user_code = await User.findOne({ opCode: req.body.code , "pods._podid": req.body._id })
    console.log(user_code)
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
    await User.updateOne(
        { _id: req.body._id },
        {
          $set: {
            location: {
              latitude: req.body.latitude,
              longitude: req.body.longitude,
            },
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

module.exports = router;
