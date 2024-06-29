const departmentRepo = require("../repositories/departmentRepo")
const empRepo = require("../repositories/empRepo")
const empInShiftRepo = require ("../repositories/empInShiftRepo")


// get all departments data
const getDeptsData = async () => {
    const departments = await departmentRepo.getAll()
    const fullDataDepts = []
    for (const dept of departments) {
        const department = await departmentRepo.getDepartment(dept._id.valueOf())
        const emps = await empRepo.getAll()
        const empsInDept = emps.filter(emp => emp.departmentID === dept._id.valueOf())
        const empsNamesIDs = empsInDept.map(emp => {
            return {id: emp._id.valueOf(), name: emp.firstName + " " + emp.lastName}
        })     
        fullDataDepts.push({...department, employees: empsNamesIDs})
    }
    return fullDataDepts
}

// get department by id
const getSingleDept = (id) => {
    return departmentRepo.getDepartment(id)
}

// get departments names and ids
const getDeptsNamesIds = async () => {
    const departments = await departmentRepo.getAll()
    const names = departments.map(dept => {
        return {id: dept._id.valueOf(), name: dept.name}
    })
    return names
}

// get all employees not in a specific department and who are not managers
const getEmpsNotInDept = async (dept_id) => {
    const emps = await empRepo.getAll()
    const empsNotDept = emps.filter(emp => emp.departmentID !== dept_id)
    const depts = await departmentRepo.getAll()
    const managers = depts.map(dept => dept.managerID)
    // filter the 'not assigned to department' employees to remove any managers
    const filteredEmps = empsNotDept.filter(emp => !managers.includes(emp._id.valueOf()))

    return filteredEmps.map(emp => {
        return {id: emp._id.valueOf(), name: emp.firstName + " " + emp.lastName}
    })
}

// update Department data according to id
const updateDept = (id, dept) => {
    return departmentRepo.updateDepartment(id, dept)
}

// update employee's department id
const updateEmpDept = async (emp_id, dept_id) => {
    const emp = await empRepo.getEmployee(emp_id)
    const new_emp = {...emp, departmentID: dept_id}
    return empRepo.updateEmployee(emp_id, new_emp)
}

// delete department and all its employees
const deleteDept = async (id) => {
    // delete department from db
    const deletedDept = await departmentRepo.deleteDepartment(id) 
    let deletedEmps = []

    // delete department employees
    const emps = await empRepo.getAll()
    const department_emps = emps.filter(emp => emp.departmentID === id)
    const promises_deletedEmps = department_emps.map(async emp => {
        deletedEmps.push(emp._id.valueOf())
        return await empRepo.deleteEmployee(emp._id.valueOf())
    })
    const resolved_deleted_emps = await Promise.all(promises_deletedEmps)

    // deleting all the shifts of the deleted employees from empInShift
    const empInShiftData = await empInShiftRepo.getAll()
    const empInShifts = empInShiftData.filter(eInS => deletedEmps.includes(eInS.employeeID))
    const promises_deletedEinS = empInShifts.map(async eInS => {
        return await empInShiftRepo.deleteEmpInShift(eInS._id.valueOf())
    })
    const resolved_deleted_EinS = await Promise.all(promises_deletedEinS)

    return { deletedDept, deletedEmps: resolved_deleted_emps, deletedEinS: resolved_deleted_EinS}
}

// add new department
const createDept = (dept) => {
    return departmentRepo.createDepartment(dept)
}

module.exports = {
    getDeptsData,
    getSingleDept,
    getDeptsNamesIds,
    getEmpsNotInDept,
    updateDept,
    updateEmpDept,
    deleteDept,
    createDept
}