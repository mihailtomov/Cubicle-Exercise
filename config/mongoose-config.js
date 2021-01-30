module.exports = () => {
    const mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost/cubicle', { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', console.log.bind(console, 'DB connected!'));
}