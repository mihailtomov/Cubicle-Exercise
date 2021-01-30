const cubes = require('../config/database.json');
const fs = require('fs');

class Cube {
    constructor(id, name, description, imageUrl, difficultyLevel) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficultyLevel = difficultyLevel;
    }

    create(callback) {
        cubes.push(this);

        fs.writeFile('./config/database.json', JSON.stringify(cubes), callback);
    }

    static getOne(id) {
        return cubes.find(c => c.id === id);
    }

    static getAll() {
        return cubes;
    }
}

module.exports = Cube;