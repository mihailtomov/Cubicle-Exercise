const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS, SECRET } = require('../config/config');

async function register(userData) {
    const { username, password, repeatPassword } = userData;

    if (password !== repeatPassword) {
        throw { message: 'Passwords don\'t match!' };
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hash });

    return user.save();
}

async function login(userData) {
    const { username, password } = userData;

    const user = await User.findOne({ username });
    if (!user) throw { message: 'Invalid username!' };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw { message: 'Invalid password!' };

    const token = jwt.sign({ _id: user._id }, SECRET);

    return token;
}

module.exports = {
    register,
    login,
}