const express = require('express');
const handlebars = require('express-handlebars');

const config = require('./config/config-port');

const app = express();

app.engine('hbs', handlebars({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));

app.get('/', (req, res) => {
    res.render('home', { layout: false });
});