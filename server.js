const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const router = express.Router();

dotenv.config();
const app = express();

const index = require('./routes/index');
app.use('/', index);

// Mongoose and mLab Time!
const MLAB_URI = process.env.MLAB_URI;
const mongoose = require('mongoose');
mongoose.connect(MLAB_URI);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("we are connected to DB");
    // Schema with one property
    var kittySchema = mongoose.Schema({
        name: String
    });

    kittySchema.methods.speak = function () {
        var greeting = this.name ? "Hi my name is " + this.name : "meow meow";
        console.log(greeting);
    }
    var Kitten = mongoose.model('Kitten', kittySchema);
    // create a document
    var silence = new Kitten({
        name: "Silence"
    });
    silence.save((err, silence) => {
        if (err) return console.error(err);
        silence.speak();
    });





});

// app.get('/addfriend', friends.addFriend);
var listener = app.listen(8888, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
