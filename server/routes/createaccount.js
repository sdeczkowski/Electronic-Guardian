const router = require("express").Router();
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const Joi = require("joi");

// walidacja dla nowych danych (używana przy rejestracji)
const validateSingUp = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    isActive: Joi.boolean().required(),
  });
  return schema.validate(data);
};

// tworzenie nowego użytkownika
router.post("/", async (req, res) => {
  try {
    // walidacja requesta
    const { error } = validateSingUp(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    // walidacja użytkownika w bazie
    
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(409).send({ message: "User with given username already Exist!" });
    
    // walidacja emaila w bazie
    const email = await User.findOne({ email: req.body.email });
    if (email) return res.status(409).send({ message: "User with given email already Exist!" });

    // hashowanie hasła
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    // zapisanie danych w bazie
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
    console.log("Dodano użytkownika 😎")
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
