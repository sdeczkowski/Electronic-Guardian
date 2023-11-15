const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const validateSingUp = (data) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    isActive: Joi.boolean().required(),
    type: Joi.string().required(),
    phoneNumber: Joi.string().required()
  });
  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    const { error } = validateSingUp(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(409).send({ message: "Konto z podanym emailem już istnieje" });

    const phone = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (phone) return res.status(409).send({ message: "Konto z podanym numerem telefonu już istnieje" });

    let complexityHandler = passwordComplexity().validate(req.body.password);
    if (complexityHandler.error)
      return res.status(409).send({
        message: "Hasło powinno mieć min. 8 znaków, cyfrę, dużą litere oraz symbol",
      });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    if (req.body.type == "op"){
      const code = Math.floor(Math.random() * 100000) + 1
      await new User({ ...req.body, password: hashPassword, opCode: code.toString() }).save();
    } else {
      await new User({ ...req.body, password: hashPassword, location: {latitude: 0, longitude: 0} }).save();
    }
    
    res.status(201).send({ message: "User created successfully" });
    console.log("Baza: Dodano użytkownika 😋");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
