const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./db");
const host = require("./host");

require("dotenv").config();
require("./models/index");

const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");

app.use(cors({ origin: [host], }));
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("Connection has been established successfully.");
  } catch (err) {
    console.log(err);
  }
};

connectToDatabase();

app.use("/user", userRouter);
app.use("/auth", authRouter);

module.exports = app;