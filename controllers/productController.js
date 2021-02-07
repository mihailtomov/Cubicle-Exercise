const express = require('express');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

const isAuthenticated = require('../middlewares/isAuthenticated');

const { Router } = express;

const router = Router();

router.get('/', async (req, res) => {
    const cubes = await cubeService.getAll(req.query);

    res.render('home', { title: 'Home', cubes });
});

router.route('/cube/create')
    .get(isAuthenticated, (req, res) => {
        res.render('create', { title: 'Create Cube' });
    })
    .post(isAuthenticated, (req, res) => {
        cubeService.create({ ...req.body, creatorId: req.user._id }, (err) => {
            if (err) {
                res.sendStatus(500).end();
            } else {
                res.redirect('/');
            }
        })
    });

router.route('/accessory/create')
    .get(isAuthenticated, (req, res) => {
        res.render('createAccessory', { title: 'Create Accessory' });
    })
    .post(isAuthenticated, (req, res) => {
        accessoryService.create(req.body)
            .then(() => res.redirect('/'))
            .catch(() => res.sendStatus(500).end());
    });

router.get('/details/:id', async (req, res) => {
    const id = req.params.id;
    const cube = await cubeService.getOneWithAccessories(id);

    let isCreator = false;
    
    if (req.user && cube.creatorId) {
        if (req.user._id === cube.creatorId) {
            isCreator = true;
        }
    }

    res.render('details', { title: 'Details', cube, isCreator });
});

router.route('/accessory/attach/:id')
    .get(isAuthenticated, async (req, res) => {
        const cubeId = req.params.id;

        const cube = await cubeService.getOne(cubeId);
        const accessories = await accessoryService.getAllUnattached(cube.accessories);

        res.render('attachAccessory', { title: 'Attach Accessory', accessories, cube });
    })
    .post(isAuthenticated, (req, res) => {
        const cubeId = req.params.id;
        const accessoryId = req.body.accessory;

        cubeService.attachAccessory(cubeId, accessoryId)
            .then(() => res.redirect(`/accessory/attach/${cubeId}`));
    });


router.route('/cube/edit/:id')
    .get(isAuthenticated, async (req, res) => {
        const id = req.params.id;
        const cube = await cubeService.getOne(id);

        res.render('editCube', { title: 'Edit Cube', cube });
    })
    .post(isAuthenticated, async (req, res) => {
        const id = req.params.id;

        await cubeService.update(id, req.body);

        res.redirect(`/details/${id}`);
    });

router.route('/cube/delete/:id')
    .get(isAuthenticated, async (req, res) => {
        const id = req.params.id;
        const cube = await cubeService.getOne(id);

        res.render('deleteCube', { title: 'Delete Cube', cube });
    })
    .post(isAuthenticated, async (req, res) => {
        const id = req.params.id;

        await cubeService.deleteOne(id);

        res.redirect('/');
    });
module.exports = router;