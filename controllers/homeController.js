const express = require('express');
const cubeService = require('../services/cubeService');

const { Router } = express;

const router = Router();

router.get('/', (req, res) => {
    res.render('home', { title: 'Home', cubes: cubeService.getAll() });
});

router.route('/create')
    .get((req, res) => {
        res.render('create', { title: 'Create' });
    })
    .post((req, res) => {
        cubeService.create(req.body);

        res.redirect('/');
    });

router.get('/details/:id', (req, res) => {
    const id = req.params.id;

    res.render('details', { title: 'Details', cube: cubeService.getOne(id) });
});

module.exports = router;