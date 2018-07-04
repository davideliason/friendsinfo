var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema(
    {
        name: {
            type: String,
            required: true
        },
        _id: Schema.Types.ObjectId,
        friends: [{ type: Schema.Types.ObjectId, ref: 'Friend' }]
    }
);

var friendSchema = Schema(
    {
        friendTo: { type: Schema.Types.ObjectId, ref: 'Person' },
        name: String,
    }
)

//Export model
module.exports = mongoose.model('Person', personSchema);
module.exports = mongoose.model('Friend', friendSchema);

