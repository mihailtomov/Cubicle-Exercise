const express = require('express');

const { Router } = express;

const router = Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

router.get('/create', (req, res) => {
    res.render('create', { title: 'Create' });
});

router.get('/details/:id', (req, res) => {
    res.render('details', { title: 'Details' });
});

module.exports = router;