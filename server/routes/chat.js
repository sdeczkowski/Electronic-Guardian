const router = require("express").Router();
const Chat = require("../models/chat.js");
const User = require("../models/user.js");

router.get("/getpods/:_id/:type", async (req, res) => {
  try {
    if (req.params.type == "op") {
      const user = await User.findOne({
        _id: req.params._id,
      });
      if (user) {
        res.status(201).send(user.pods);
      } else {
        res.status(404).send({ message: "Not found" });
      }
    } else {
      const user = await User.find(
        {
          "pods._id": req.params._id,
        },
        { _id: 1, firstname: 1, lastname: 1 }
      );
      if (user) {
        res.status(201).send(user);
      } else {
        res.status(404).send({ message: "Not found" });
      }
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.post("/send", async (req, res) => {
  try {
    await Chat.updateOne(
      {
        $or: [
          { _id1: req.body._id1, _id2: req.body._id2 },
          { _id1: req.body._id2, _id2: req.body._id1 },
        ],
      },
      {
        $push: {
          message: {
            _id: req.body._id,
            text: req.body.text,
            createdAt: req.body.createdAt,
            user: req.body.user
          },
        },
      }
    );
    res.status(201).send({ message: "Message added successfully" });
    console.log("Baza: Dodano wiadomość 🫨");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.get("/set/:_id1/:_id2", async (req, res) => {
  try {
    const chat = await Chat.findOne({
      $or: [
        { _id1: req.params._id1, _id2: req.params._id2 },
        { _id1: req.params._id2, _id2: req.params._id1 },
      ],
    });
    if (chat) {
      res.status(201).send(chat.message);
      console.log("Serwer: Wysłano chat 🤪");
    } else {
      await new Chat({
        _id1: req.params._id1,
        _id2: req.params._id2,
        message: [],
      }).save();
      res.status(201).send([]);
      console.log("Baza: Stworzono chat 🫢");
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

module.exports = router;
