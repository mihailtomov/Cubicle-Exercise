const Cube = require('../models/Cube');

async function getAll(query) {
    try {
        let cubes = await Cube.find().lean();

        if (query.search) {
            cubes = cubes.filter(x => x.name.toLowerCase().includes(query.search));
        }

        if (query.from) {
            cubes = cubes.filter(x => x.difficultyLevel >= Number(query.from));
        }

        if (query.to) {
            cubes = cubes.filter(x => x.difficultyLevel <= Number(query.to));
        }

        return cubes;
    } catch (error) {
        console.log(error);
    }
}

function getOne(id) {
    return Cube.findById(id).lean();
}

function create(data, callback) {
    const cube = new Cube(data);

    cube.save(callback);
}

module.exports = {
    getAll,
    getOne,
    create,
}