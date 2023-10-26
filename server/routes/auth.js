const router = require("express").Router()
const User = require("../models/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
    return schema.validate(data)
}

const generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    })
    return token
}


router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) 
            return res.status(401).send({ message: "Błędny email" })
        
        if (!user.isActive)
        return res.status(401).send({ message: "Konto zostało zdezaktywowane" })
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!validPassword)
            return res.status(401).send({ message: "Błędne hasło" })
        
        const token = generateAuthToken();
        res.status(200).send({ data: {token: token, type: user.type, email: user.email}, message: "Logged in successfully" })
        console.log("Serwer: Wysłano token 🤠")
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

module.exports = router