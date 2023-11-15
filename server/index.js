require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const auth = require("./routes/auth.js");
const signup = require("./routes/createaccount.js");
const notification = require("./routes/notifications.js");
const area = require("./routes/area.js");
const user = require("./routes/user.js");
const connectDB = require("./database/DB.js");

const port = process.env.PORT || "3001";

// Łączenie z bazą
connectDB();

//JSON
app.use(express.json());
app.use(cors());

//Routy
app.use("/api/noti", notification);
app.use("/api/signup", signup);
app.use("/api/auth", auth);
app.use("/api/area", area);
app.use("/api/user", user);

app.listen(port, () => console.log(`Serwer: Nasłuchiwanie na porcie ${port} 👌`));
