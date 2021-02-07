const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        reqired: true,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;