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
var friendModel = require('mongoose').model('Friend');
// mongoose --> mongoDB connection
var mongoose = require('mongoose');
mongoose.connect(MLAB_URI);
mongoose.Promise = global.Promise;
// Connection instance
var db = mongoose.connection;

var person = new personModel({
    name: "Kimberly",
    _id: new mongoose.Types.ObjectId()
});

person.save(function (err) {
    if (err) throw err;

    var friend1 = new friendModel({
        friendTo: person._id,
        name: "Johnny"
    });

    friend1.save(function (err) {
        if (err) return handleError(err);
        console.log("friend saved");
    });
});

personModel.find({}, (err, data) => {
    if (err) return handleError(err);
    console.log(data);
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

friendModel.
    findOne({
        name: "Johnny"
    }).
    populate('friendTo').
    exec((err, friend) => {
        if (err) return handleError(err);
        console.log(friend);
    });

// routes
app.use('/', index);
app.use('/people', people);
// app.get('/addfriend', friends.addFriend);
var listener = app.listen(8888, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
