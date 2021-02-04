const express = require('express');
const authService = require('../services/authService');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Router } = express;

const router = Router();

router.use(cookieParser());

router.route('/register')
    .get((req, res) => {
        res.render('registerPage');
    })
    .post((req, res) => {
        const { username, password, repeatPassword } = req.body;

        if (password === repeatPassword) {
            bcrypt.hash(password, 9, async (err, hashPassword) => {
                if (err) return console.log(err);

                const user = { username, password: hashPassword };

                try {
                    await authService.create(user);

                    const payload = user;
                    const secret = 'test';
                    const options = { expiresIn: '2d' };

                    const token = jwt.sign(payload, secret, options);

                    res.cookie('auth', token);
                    res.redirect('/login');

                } catch (err) {
                    console.log(err);
                }
            });
        }
    });

router.route('/login')
    .get((req, res) => {
        res.render('loginPage');
    })
    .post((req, res) => {

    });

module.exports = router;