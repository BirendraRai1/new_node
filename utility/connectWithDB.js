const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const { DB_PASSWORD, DB_USER, DB_NAME } = process.env;

// const dbURL="mongodb://127.0.0.1:27017/horeca-test"
const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.tjexcbi.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
// once
mongoose
  .connect(dbURL)
  .then(function (connection) {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));
