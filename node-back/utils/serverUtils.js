const express = require("express");
const port = 5001;
var bodyParser = require("body-parser");

const createServer = () => {

    const app = express();
    var cors = require("cors");

    var apiRoutes = require("../routes/api");
    var playerRoutes = require("../routes/player");
    var coachRoutes = require("../routes/coach");
    app.use(cors());
    app.use("/", apiRoutes);
    app.use("/player", playerRoutes);
    app.use("/coach", coachRoutes);

    // Middleware
    // some dependency=
    app.use(bodyParser.urlencoded({ extended: true }));
    

    return app;
};
module.exports = { createServer };