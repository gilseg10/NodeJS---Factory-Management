const empRepo = require("../repositories/empRepo")
const departmentRepo = require("../repositories/departmentRepo")
const empInShiftRepo = require ("../repositories/empInShiftRepo")
const shiftRepo = require("../repositories/shiftRepo")


// get Employees Data (full name, department name and list of shifts objects)
const getEmpsData = async () => {
    const empsData = await empRepo.getAll()
    // console.log(empsData)
    const departmentsData = await departmentRepo.getAll()

    const employees_promises = empsData.map(async emp => {
        // get Employee shifts according to his id
        const shifts = await getEmpShifts(emp._id.valueOf())
        // finding the department that the employee belongs to
        const department = departmentsData.find(dept => emp.departmentID === dept._id.valueOf())
        return {
            name: emp.firstName + " " + emp.lastName, 
            id: emp._id.valueOf(),
            department: department ? department.name : "", 
            departmentID: department ? department._id.valueOf() : "",
            shifts
        }
    })
    return Promise.all(employees_promises)
}

// get Employee shifts according to his id
const getEmpShifts = async (emp_id) => {
    const empInShiftData = await empInShiftRepo.getAll()
    const shiftsData = await shiftRepo.getAll()

    // filtering the empInshift to be only shifts of current employee
    const empInshifts = empInShiftData.filter(eInS => eInS.employeeID === emp_id)
    // mapping the empInshifts to be shifts objects using find in shiftData
    const shifts = empInshifts.map(eInS => shiftsData.find(shift => eInS.shiftID === shift._id.valueOf()))
    return shifts
}


// get Employee Data (first name, last name, starting year and department name)
const getEmpById = async (id) => {
    const employee = await empRepo.getEmployee(id)
    const department = await departmentRepo.getDepartment(employee.departmentID)
    const shifts = await getEmpShifts(id)
    return { ...employee, department: department.name, departmentID: department._id.valueOf(), shifts}
}

// get department id and return all employees of that department
const getEmpsByDepartment = async (dept_id) => {
    const emps = await empRepo.getAll()
    const department_emps = emps.filter(emp => emp.departmentID === dept_id)
    return department_emps
}

const getManagers = async () => {
    const departments = await departmentRepo.getAll()
    const managersIDs = departments.map(dept => dept.managerID)
    let names_and_ids = []
    for (const manager_id of managersIDs) {
        const manager = await empRepo.getEmployee(manager_id)
        names_and_ids.push(
            {   
                id: manager._id.valueOf(), 
                name: manager.firstName + " " + manager.lastName
            })
    }
    return names_and_ids
}

const getNotManagers = async () => {
    const emps = await empRepo.getAll()
    const depts = await departmentRepo.getAll()
    const managers = depts.map(dept => dept.managerID)
    // filter the 'not assigned to department' employees to remove any managers
    const notManagers = emps.filter(emp => !managers.includes(emp._id.valueOf()))

    return notManagers.map(emp => {
        return {id: emp._id.valueOf(), name: emp.firstName + " " + emp.lastName}
    })
}

const createEmp = async (emp) => {
    const new_emp = await empRepo.createEmployee(emp)
    return new_emp
}

// update Employee data according to id
const updateEmpById = (id, emp) => {
    return empRepo.updateEmployee(id, emp)
}

// delete employee, his shifts in empInShift
const deleteEmp = async (id) => {
    try {
        // delete the employee itself
        const deletedEmp = await empRepo.deleteEmployee(id)
        if (!deletedEmp) {
            const error = new Error('Employee not found');
            error.name = 'NotFoundError';
            throw error;
        }
        let deletedEmpShifts = {deletedEmp}
        
        // delete the shifts of the employee from empInShift
        const empInShiftData = await empInShiftRepo.getAll()
        // filtering the empInshift to be only shifts of this employee's id
        const empInshifts = empInShiftData.filter(eInS => eInS.employeeID === id)
        const promises_deletedEinS = empInshifts.map(async eInS => {
            return await empInShiftRepo.deleteEmpInShift(eInS._id.valueOf())
        })
        const resolved_deleted = await Promise.all(promises_deletedEinS)
        deletedEmpShifts = {...deletedEmpShifts, ...resolved_deleted}
    
        return deletedEmpShifts
    } catch (e) {
        console.error('Error in deleteEmp:', e);
        throw e;
    }
}

// check if this employee was a department manager
// and returns true and dept id if yes
const checkIfManager = async (id) => {
    const depts = await departmentRepo.getAll()
    const dept_manager = depts.find(dept => dept.managerID === id)
    let isManager = false
    if (dept_manager) {
        isManager = true
    }
    return {isManager, departmentID_change: dept_manager?._id.valueOf()}
}

module.exports = {
    getEmpsData,
    getEmpShifts,
    getEmpById,
    getEmpsByDepartment,
    getManagers,
    getNotManagers,
    createEmp,
    updateEmpById,
    deleteEmp,
    checkIfManager
}

