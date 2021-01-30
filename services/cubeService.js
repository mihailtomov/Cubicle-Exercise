const cubes = require('../config/database.json');
const Cube = require('../models/Cube');
const uniqid = require('uniqid');
const cubeData = require('../data/cubeData');

function getAll(query) {
    let result = cubes;

    if (query.search) {
        result = result.filter(x => x.name.toLowerCase().includes(query.search));
    }

    if (query.from) {
        result = result.filter(x => x.difficultyLevel >= Number(query.from));
    }

    if (query.to) {
        result = result.filter(x => x.difficultyLevel <= Number(query.to));
    }

    return result;
}

function getOne(id) {
    return cubeData.getOne(id);
}

function create(data, callback) {
    const cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel,
    );

    cubeData.create(cube, callback);
}

module.exports = {
    getAll,
    getOne,
    create,
}