const express = require('express');

const { Router } = express;

const router = Router();

router.get('/', (req, res) => {
    res.render('home', { layout: false });
});

router.get('/create', (req, res) => {
    res.render('create', { layout: false });
});

router.get('/details/:id', (req, res) => {
    res.render('details', { layout: false });
});

module.exports = router;