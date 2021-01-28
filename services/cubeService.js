const cubes = require('../config/database.json');
const Cube = require('../models/Cube');
const uniqid = require('uniqid');
const fs = require('fs');

function getAll() {
    return cubes;
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
    create,
}