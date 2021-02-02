const express = require('express');

const app = express();

const config = require('./config/config');
require('./config/express-config')(app);
require('./config/mongoose-config')();

const router = require('./routes.js');

app.use(router);

app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));