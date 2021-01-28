const express = require('express');

const app = express();

const config = require('./config/config-port');
require('./config/express-config')(app);

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));

app.get('/', (req, res) => {
    res.render('home', { layout: false });
});