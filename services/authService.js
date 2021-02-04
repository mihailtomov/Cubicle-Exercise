const User = require('../models/User');

function create(data) {
    const user = new User(data);

    return user.save();
}

module.exports = {
    create,
}