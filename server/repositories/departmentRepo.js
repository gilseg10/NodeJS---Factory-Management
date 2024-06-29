const departmentModel = require("../models/departmentModel")

// get all departments
const getAll = () => {
    return departmentModel.find()
}

// get department by ID
const getDepartment = async (id) => {
    const {_doc: dept } = await departmentModel.findById(id)
    return dept
}

// add new employee
const createDepartment = async (department) => {
    department = new departmentModel(department)
    await department.save()
    return department
}

// update employee by ID
const updateDepartment = async (id, department) => {
    await departmentModel.findByIdAndUpdate(id, department)
    return await getDepartment(id)
}

// delete employee by ID
const deleteDepartment = async (id) => {
    const department = await getDepartment(id)
    await departmentModel.findByIdAndDelete(id)
    return department
}

module.exports = {
    getAll,
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment
}