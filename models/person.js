var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        friends: [{ firstName: String, lastName: String }]
    }
);

//Export model
module.exports = mongoose.model('Person', PersonSchema);