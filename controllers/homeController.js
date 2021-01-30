const express = require('express');
const cubeService = require('../services/cubeService');

const { Router } = express;

const router = Router();

router.get('/', (req, res) => {
    cubeService.getAll(req.query)
        .then(cubes => {
            res.render('home', { title: 'Home', cubes });
        })
        .catch(err => console.log(err));
});

router.route('/create')
    .get((req, res) => {
        res.render('create', { title: 'Create' });
    })
    .post((req, res) => {
        cubeService.create(req.body, (err) => {
            if (err) {
                res.sendStatus(500).end();
            } else {
                res.redirect('/');
            }
        })
    });

router.get('/details/:id', (req, res) => {
    const id = req.params.id;

    cubeService.getOne(id)
        .then(cube => {
            res.render('details', { title: 'Details', cube });
        })
        .catch(err => console.log(err));
});

module.exports = router;