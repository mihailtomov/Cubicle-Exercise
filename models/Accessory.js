const mongoose = require('mongoose');

const accessorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        match: /https?/
    },
    description: {
        type: String,
        required: true,
        maxLength: 30,
    },
    cubes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cube',
    }]
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;