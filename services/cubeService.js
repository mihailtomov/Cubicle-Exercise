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

function getOneWithAccessories(id) {
    return Cube.findById(id)
        .populate('accessories')
        .lean();
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

async function update(id, data) {
    return await Cube.findByIdAndUpdate(id, data);
}

async function deleteOne(id) {
    return await Cube.deleteOne({ _id: id });
}

module.exports = {
    getAll,
    getOne,
    getOneWithAccessories,
    create,
    update,
    deleteOne,
    attachAccessory,
}