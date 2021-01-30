const cubes = require('../config/database.json');
const fs = require('fs');

module.exports = {
    create(cube, callback) {
        cubes.push(cube);

        fs.writeFile('./config/database.json', JSON.stringify(cubes), callback);
    },

    getOne(id) {
        return cubes.find(c => c.id === id);
    },

    getAll() {
        return cubes;
    }
}