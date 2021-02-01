const express = require('express');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

const { Router } = express;

const router = Router();

router.get('/', async (req, res) => {
    const cubes = await cubeService.getAll(req.query);

    res.render('home', { title: 'Home', cubes });
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

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubeService.getOneWithAccessories(id);

    res.render('details', { title: 'Details', cube });
});

router.route('/accessory/attach/:id')
    .get(async (req, res) => {
        const cubeId = req.params.id;

        const cube = await cubeService.getOne(cubeId);
        const accessories = await accessoryService.getAllUnattached(cube.accessories);

        res.render('attachAccessory', { title: 'Attach Accessory', accessories, cube });
    })
    .post((req, res) => {
        const cubeId = req.params.id;
        const accessoryId = req.body.accessory;

        cubeService.attachAccessory(cubeId, accessoryId)
            .then(() => res.redirect(`/accessory/attach/${cubeId}`));
    });

module.exports = router;