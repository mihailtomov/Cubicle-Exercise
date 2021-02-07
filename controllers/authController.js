const express = require('express');
const authService = require('../services/authService');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

const { Router } = express;

const router = Router();

router.route('/register')
    .get(isGuest, (req, res) => {
        res.render('register');
    })
    .post(isGuest, async (req, res) => {
        try {
            await authService.register(req.body);

            res.redirect('/login');
        } catch (error) {
            res.render('registerPage', { error });
        }
    })

router.route('/login')
    .get(isGuest, (req, res) => {
        res.render('login');
    })
    .post(isGuest, async (req, res) => {
        try {
            const token = await authService.login(req.body);
            res.cookie('AUTH', token);

            res.redirect('/');
        } catch (error) {
            res.render('login', { error });
        }
    })

router.get('/logout', isAuthenticated, (req, res) => {
    res.clearCookie('AUTH');

    res.redirect('/');
});

module.exports = router;