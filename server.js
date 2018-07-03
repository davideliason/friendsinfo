const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
// this needs to be initiated ASAP
dotenv.config();
// server
var app = express();

// routes
app.get('/', function (req, res, next) {
    res.send("hello world");
});
// mLab connection
const MLAB_URI = process.env.MLAB_URI;

// mongoose --> mongoDB connection
var mongoose = require('mongoose');
mongoose.connect(MLAB_URI);
mongoose.Promise = global.Promise;
// Connection instance
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var listener = app.listen(8888, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
