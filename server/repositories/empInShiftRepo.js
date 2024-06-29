const empInShiftModel = require("../models/empInShiftModel")

// get all employees in shifts
const getAll = () => {
    return empInShiftModel.find()
}

// get empInShift by ID
const getEmpInShiftById = async (id) => {
    const {_doc: empInShift } = await empInShiftModel.findById(id)
    return empInShift
}

// get empInShift by shiftID and employeeID
const getEmpInShift = async (empInShift) => {
    return await empInShiftModel.findOne({...empInShift})
}

// add new empInShift
const createEmpInShift = async (empInShift) => {
    empInShift = new empInShiftModel(empInShift)
    await empInShift.save()
    return empInShift
}

// delete empInShift by ID
const deleteEmpInShift = async (id) => {
    const empInShift = await getEmpInShift(id)
    await empInShiftModel.findByIdAndDelete(id)
    return empInShift
}

module.exports = {
    getAll,
    getEmpInShiftById,
    getEmpInShift,
    createEmpInShift,
    deleteEmpInShift
}