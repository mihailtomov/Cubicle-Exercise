const cubes = require('../config/database.json');
const Cube = require('../models/Cube');
const uniqid = require('uniqid');
const fs = require('fs');

function getAll() {
    return cubes;
}

function getOne(id) {
    return cubes.find(c => c.id === id);
}

function create(data) {
    const cube = new Cube(
        uniqid(),
        data.name,
        data.description,
        data.imageUrl,
        data.difficultyLevel,
    );

    cubes.push(cube);

    fs.writeFile('./config/database.json', JSON.stringify(cubes), (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
}

module.exports = {
    getAll,
    getOne,
    create,
}