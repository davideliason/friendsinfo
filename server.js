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

db.once('open', function () {
    console.log("db connected");
});

// Schema with one property
var kittySchema = mongoose.Schema({
    name: String,
    color: String,
    friendly: Boolean
});

var Kitten = mongoose.model('Kitten', kittySchema);
// create a document
var greencat = new Kitten({
    name: "GreenCat",
    color: "green",
    friendly: true
});
greencat.save((err, greencat) => {
    if (err) return console.error(err);
    console.log(greencat + "saved");
});

Kitten.findOne({ 'name': 'GreenCat' }, 'name color', { friendly: true }, (err, kitty) => {
    if (err) return console.error(err);
    console.log(kitty.color + " " + kitty.name);
})






// app.get('/addfriend', friends.addFriend);
var listener = app.listen(8888, function () {
    console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});
