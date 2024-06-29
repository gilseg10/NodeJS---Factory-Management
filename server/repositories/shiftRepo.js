const shiftModel = require("../models/shiftModel")

// get all shifts
const getAll = () => {
    return shiftModel.find()
}

// get shift by ID
const getShift = async (id) => {
    const {_doc: shift} = await shiftModel.findById(id)
    return shift
}

// add new shift
const createShift = async (shift) => {
    shift = new shiftModel(shift)
    await shift.save()
    return shift
}

// update shift by ID
const updateShift = async (id, shift) => {
    await shiftModel.findByIdAndUpdate(id, shift)
    return getShift(id)
}

module.exports = {
    getAll,
    getShift,
    createShift,
    updateShift
}