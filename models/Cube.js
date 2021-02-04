const mongoose = require('mongoose');

const cubeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 30,
    },
    imageUrl: {
        type: String,
        required: true,
        match: /https?/
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6,
    },
    creatorId: {
        type: String,
        required: true,
    },
    accessories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Accessory',
    }]
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;