const employeeModel = require("../models/employeeModel")

// get all employees
const getAll = () => {
    return employeeModel.find()
}

// get employee by ID
const getEmployee = async (id) => {
    const {_doc: emp} = await employeeModel.findById(id)
    return emp
}

// add new employee
const createEmployee = async (emp) => {
    emp = new employeeModel(emp)
    await emp.save()
    return emp
}

// update employee by ID
const updateEmployee = async (id, emp) => {
    await employeeModel.findByIdAndUpdate(id, emp)
    return getEmployee(id)
}

// delete employee by ID
const deleteEmployee = async (id) => {
    const emp = await getEmployee(id)
    await employeeModel.findByIdAndDelete(id)
    return emp
}

module.exports = {
    getAll,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}