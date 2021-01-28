const express = require('express');

const { Router } = express;

const router = Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/create', (req, res) => {
    res.render('create');
});

router.get('/details/:id', (req, res) => {
    res.render('details');
});

module.exports = router;