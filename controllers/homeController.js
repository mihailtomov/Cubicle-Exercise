const express = require('express');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

const { Router } = express;

const router = Router();

router.get('/', (req, res) => {
    cubeService.getAll(req.query)
        .then(cubes => {
            res.render('home', { title: 'Home', cubes });
        })
        .catch(err => console.log(err));
});

router.route('/cube/create')
    .get((req, res) => {
        res.render('create', { title: 'Create Cube' });
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

router.route('/accessory/create')
    .get((req, res) => {
        res.render('createAccessory', { title: 'Create Accessory' });
    })
    .post((req, res) => {
        accessoryService.create(req.body)
            .then(() => res.redirect('/'))
            .catch(() => res.sendStatus(500).end());
    });

router.get('/details/:id', (req, res) => {
    const id = req.params.id;

    cubeService.getOne(id)
        .then(cube => {
            res.render('details', { title: 'Details', cube });
        })
        .catch(err => console.log(err));
});

router.route('/accessory/attach/:id')
    .get((req, res) => {
        const cubeId = req.params.id;

        accessoryService.getAll()
            .then(accessories => {
                cubeService.getOne(cubeId)
                    .then(cube => {
                        res.render('attachAccessory', { title: 'Attach Accessory', accessories, cube });
                    })
            })
    })
    .post((req, res) => {
        const cubeId = req.params.id;
        const accessoryId = req.body.accessory;

        cubeService.attachAccessory(cubeId, accessoryId)
            .then(() => res.redirect(`/accessory/attach/${cubeId}`));
    });

module.exports = router;