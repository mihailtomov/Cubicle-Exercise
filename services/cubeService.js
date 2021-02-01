const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

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

async function attachAccessory(cubeId, accessoryId) {
    const cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    return cube.save();
}

module.exports = {
    getAll,
    getOne,
    create,
    attachAccessory,
}