// import all required packages

var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");

// Create object of Express to use globally
var expobj = express();

// Setup mongoose to interact with database
mongoose.connect("mongodb://localhost:27017/voidhacks");
mongoose.connection.on("Connected", function () {
    console.log("Connection established");
});
mongoose.connection.on("err", function () {
    if (err) {
        console.log("ther is an errro" + err);
    }
});
mongoose.connection.on("disconnected", function () {
    console.log("Disconnected");
});

process.on("SIGINT", function () {
    console.log("Disconnected from the DB");
    process.exit(0);
});

// import database configuration file
var db = require("./backendconfig/db");

// define the port number
var port = process.env.PORT || 8080;

// Use Functionalities of impoted packages
expobj.use(bodyParser.json());
expobj.use(
    bodyParser.json({
        type: "application/vnd.api/json"
    })
);
expobj.use(
    bodyParser.urlencoded({
        extended: true
    })
);
expobj.use(methodOverride("X-HTTP-Method-Override"));

// Tell the express api about static pages location
expobj.use(express.static(__dirname + "/public"));

require('./backendapp/routes')(expobj);

// Tell the server to listen to the assigned port number
expobj.listen(port);

console.log("Server has been started");
console.log("To check the port visit http://localhost:" + port + "/");

// Export this modules object to use in other modules
exports = module.exports = expobj;