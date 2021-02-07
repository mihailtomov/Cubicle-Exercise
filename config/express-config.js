const { urlencoded } = require('express');
const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const auth = require('../middlewares/auth');

function expressConfig(app) {
    app.engine('hbs', handlebars({
        extname: 'hbs',
        helpers: {
            isEqual: function (expectedValue, value) {
                return value === expectedValue;
            }
        }
    }));

    app.set('view engine', 'hbs');

    app.use(express.static('public'));

    app.use(urlencoded({
        extended: true
    }));

    app.use(cookieParser());

    app.use(auth);
}

module.exports = expressConfig;