const express = require('express');
const homeController = require('./controllers/homeController');
const aboutController = require('./controllers/aboutController');

const { Router } = express;

const router = Router();

router.use('/', homeController);
router.use('/about', aboutController);

router.get('*', (req, res) => {
    res.render('404');
});

module.exports = router;