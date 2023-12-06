const router = require("express").Router();
const AreaDetails = require("../models/area.js");
const User = require("../models/user.js");
const Joi = require("joi");

const validateArea = (data) => {
  const schema = Joi.object({
    _opid: Joi.string().required(),
    _podid: Joi.string().required(),
    name: Joi.string().required(),
    date: Joi.string().required(),
    cords: Joi.array(),
    initialRegion: Joi.object().keys({
      latitude: Joi.number(),
      latitudeDelta: Joi.number(),
      longitude: Joi.number(),
      longitudeDelta: Joi.number()
    }),
    isActive: Joi.boolean().required(),
    repeat: Joi.number().required(),
    time_f: Joi.string().required(),
    time_t: Joi.string().required(),
  });
  return schema.validate(data);
};

router.get("/getname/:opid/:name", async (req, res) => {
  try {
    const areaname = await AreaDetails.findOne({
      _opid: req.params.opid,
      name: req.params.name
    });
    if (areaname) {
      res.status(201).send({ isname: true });
    } else {
      res.status(201).send({ isname: false});
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.get("/get/:opid/:podid/:name", async (req, res) => {
  try {
    const area = await AreaDetails.findOne({
      _opid: req.params.opid,
      _podid: req.params.podid,
      name: req.params.name,
    });
    if (area) {
      var dateObject = new Date(area.date);
      var timefObject = new Date(area.time_from)
      var timetObject = new Date(area.time_to)
      area.date = `${dateObject.getDate()}.${dateObject.getMonth() + 1}.${dateObject.getFullYear()}`;
      area.time_from = `${timefObject.getHours()}:${timefObject.getMinutes() < 10 ? '0' : ''}${timefObject.getMinutes()}`;
      area.time_to = `${timetObject.getHours()}:${timetObject.getMinutes() < 10 ? '0' : ''}${timetObject.getMinutes()}`;
      res.status(201).send(area);
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

router.get("/getpodarealook/:podid", async (req, res) => {
  try {
    const area = await AreaDetails.find({
      _podid: req.params.podid,
      isActive: true,
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

router.get("/getpodarea/:opid/:podid", async (req, res) => {
  try {
    const area = await AreaDetails.find({
      _opid: req.params.opid,
      _podid: req.params.podid,
    });
    if (area) {
      area.map(async(item) => {
        const date = new Date();
        const poddate = new Date(item.date);
        const podTimeFrom = new Date(item.time_from);
        const podTimeTo = new Date(item.time_to);

        var formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        var podformDate = poddate.getDate() + "/" + (poddate.getMonth() + 1) + "/" + poddate.getFullYear();

      if(podTimeFrom.getTime() < date.getTime() && podTimeTo.getTime() > date.getTime()){
        await AreaDetails.updateOne(
          { _opid: item._opid,
            _podid: item._podid,
            name: item.name, },
          {
            $set: {
              isActive: true
            },
          }
        );
      } else {
        await AreaDetails.updateOne(
          { _opid: item._opid,
            _podid: item._podid,
            name: item.name, },
          {
            $set: {
              isActive: false
            },
          }
        );
      }
      })
      const area2 = await AreaDetails.find({
        _opid: req.params.opid,
        _podid: req.params.podid,
      });
      res.status(201).send(area2);
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
    const user = await User.findOne({_id: req.params._id})
    if(user.type == "pod") return res.status(403).send({ message: "Forbidden" })
    const area = await AreaDetails.find({ _opid: req.params._id });
    if (area) {
      area.map(async(item) => {
        var dateObject = new Date(item.date);
        var timefObject = new Date(item.time_from)
        var timetObject = new Date(item.time_to)
        item.date = `${dateObject.getDate()}.${dateObject.getMonth() + 1}.${dateObject.getFullYear()}`;
        item.time_from = `${timefObject.getHours()}:${timefObject.getMinutes() < 10 ? '0' : ''}${timefObject.getMinutes()}`;
        item.time_to = `${timetObject.getHours()}:${timetObject.getMinutes() < 10 ? '0' : ''}${timetObject.getMinutes()}`;})
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
      _opid: req.body._opid,
      _podid: req.body._podid,
      name: req.body.name,
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
    if (error) return res.status(400).send({ message: error.details[0].message });
    const area = await AreaDetails.findOne({ _opid: req.body._opid, _podid: req.body._podid, name: req.body.name, });
    if (area) return res.status(401).send({ message: "Area already exists" });
    const { firstname, lastname } = await User.findOne({
      _id: req.body._podid,
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
      initialRegion: req.body.initialRegion,
      repeat: req.body.repeat,
      time_from: req.body.time_f,
      time_to: req.body.time_t,
      isActive: req.body.isActive,
      loc_status: false
    }).save();
    res.status(201).send({ message: "Area created successfully" });
    console.log("Baza: Dodano Obszar 🗺️");
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
    console.log(error);
  }
});

module.exports = router;
