const express = require('express');
const productController = require('./controllers/productController');
const aboutController = require('./controllers/aboutController');
const authController = require('./controllers/authController');

const { Router } = express;

const router = Router();

router.use('/', authController);
router.use('/', productController);
router.use('/about', aboutController);

router.get('*', (req, res) => {
    res.render('404', {title: 'Not Found'});
});

module.exports = router;