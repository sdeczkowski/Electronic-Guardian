const router = require("express").Router()
const User = require("../models/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// walidacja loginu
const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    return schema.validate(data)
}

// generowanie tokenu
const generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    })
    return token
}

// autoryzacja
router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        // walidacja emaila
        if (!user) 
            return res.status(401).send({ message: "Błędny email" })
        // walidacja aktywacji konta
        if (!user.isActive)
        return res.status(401).send({ message: "Konto zostało zdezaktywowane" })
        // walidacja hasła
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validPassword)
            return res.status(401).send({ message: "Błędne hasło" })
        
        // generowanie tokenu
        const token = generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" })
        console.log("Serwer: Wysłano token 🤠")
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

module.exports = router