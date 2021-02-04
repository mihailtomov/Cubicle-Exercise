const express = require('express');

const { Router } = express;

const router = Router();

router.route('/register')
    .get((req, res) => {
        res.render('registerPage');
    })
    .post((req, res) => {
        
    });

router.route('/login')
    .get((req, res) => {
        res.render('loginPage');
    })
    .post((req, res) => {

    });

module.exports = router;