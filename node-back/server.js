const express = require("express");
const app = express();
const port = 5001;
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
//environment variables
require("dotenv").config();
var cors = require("cors");

// all routes
var apiRoutes = require("./routes/api");
var playerRoutes = require("./routes/player");
var coachRoutes = require("./routes/coach");
//database
/*mongoose.connect(
  process.env.DB_CONECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (res, req) => {
    console.log("Connected Database Successfully");
  }
);*/
const connectToMongo = async () => {
  await mongoose.connect(process.env.DB_CONECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose;
};
connectToMongo().then(async () => console.log("connected yeee"));
// use all routes
app.use(cors());
app.use("/", apiRoutes);
app.use("/player", playerRoutes);
app.use("/coach", coachRoutes);

// Middleware
// some dependency=
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
