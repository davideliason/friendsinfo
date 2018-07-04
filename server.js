const express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var router = express.Router();

dotenv.config();
var app = express();

var index = require('./routes/index');
app.use('/', index);

// Mongoose and mLab Time!
const MLAB_URI = process.env.MLAB_URI;
var mongoose = require('mongoose');
mongoose.connect(MLAB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we are connected to DB");

    var kittySchema = mongoose.Schema({
        name: String
    });

    kittySchema.methods.speak = function () {
        var greeting = this.name ? "Hi my name is " + this.name : "meow meow";
        console.log(greeting);
    }
    var Kitten = mongoose.model('Kitten', kittySchema);
    var silence = new Kitten({
        name: "Silence"
    });
    silence.speak();





});

// app.get('/addfriend', friends.addFriend);
var listener = app.listen(8888, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
