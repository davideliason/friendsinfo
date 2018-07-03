const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var router = express.Router();

// this needs to be initiated ASAP
dotenv.config();
// server
var app = express();

// routes
var index = require('./routes/index');
var people = require('./routes/people');

// mLab connection
const MLAB_URI = process.env.MLAB_URI;
// access models
require("./models/person");
var personModel = require('mongoose').model('Person');
// mongoose --> mongoDB connection
var mongoose = require('mongoose');
mongoose.connect(MLAB_URI);
mongoose.Promise = global.Promise;
// Connection instance
var db = mongoose.connection;

var person = new personModel({
    name: "Bob"
});

person.friends.push({ firstName: "Tom", lastName: "Guy" });
// embedded doc

person.save(function (err, model) {
    if (err) throw err;
    console.log("new author saved");
});


db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// routes
app.use('/', index);
app.use('/people', people);
// app.get('/addfriend', friends.addFriend);
var listener = app.listen(8888, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
