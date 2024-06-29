const shiftRepo = require("../repositories/shiftRepo")
const empInShiftRepo = require("../repositories/empInShiftRepo")
const empRepo = require("../repositories/empRepo")

// get all shifts and all the employees for each shift
const getShiftsData = async () => {
    const shifts = await shiftRepo.getAll()
    const empsInShifts = await empInShiftRepo.getAll()
    const fullDataShifts = []

    for (const shift of shifts) {
        const employees = []
        // all emps ids in a specific shift
        const shiftEmps = empsInShifts.filter(eIs => eIs.shiftID === shift._id.valueOf())
        for (const empAndShift of shiftEmps) {
            const emp = await empRepo.getEmployee(empAndShift.employeeID)
            employees.push({id: emp._id.valueOf(), name: emp.firstName + " " + emp.lastName})            
        }
        const empsNotInShift = await getEmpsNotInShift(shift._id.valueOf())
        fullDataShifts.push({...shift._doc, employees, empsNotInShift})         
    }
    // sort the shifts based on their date and start hour
    fullDataShifts.sort((a, b) => {
        const aDate = new Date(a.date.split('/').reverse().join('-') + 'T' + a.startingHour);
        const bDate = new Date(b.date.split('/').reverse().join('-') + 'T' + b.startingHour);
        return aDate - bDate;
    })
    return fullDataShifts
}

const testFindOne = async () => {
    return await empInShiftRepo.getEmpInShift()
}

// get all employees (id and names only) that not belong to a specific shift
const getEmpsNotInShift = async (shiftID) => {
    const employees = []
    const all_emps = await empRepo.getAll()
    const all_empsIDs = all_emps.map(emp => emp._id.valueOf())

    for (const employeeID of all_empsIDs) {
        const empInShift = await empInShiftRepo.getEmpInShift({shiftID, employeeID})
        if (!empInShift) {
            const emp = await empRepo.getEmployee(employeeID)
            employees.push({id: emp._id.valueOf(), name: emp.firstName + " " + emp.lastName})
        }
    }
    return employees
}

// get all shifts that the employee hasn't taken
const getShiftsNotOfEmp = async (emp_id) => {
    const shifts = await shiftRepo.getAll()
    const empsInShifts = await empInShiftRepo.getAll()
    // filter to get only shifts of the specific employee
    const empInShifts = empsInShifts.filter(eIs => eIs.employeeID === emp_id)
    const empShiftsIds = empInShifts.map(eIs => eIs.shiftID)
    const idsSet = new Set(empShiftsIds)
    // exclude all the shifts that the employee already taken
    const filteredShifts = shifts.filter(shift => !idsSet.has(shift._id.valueOf()))
    return filteredShifts
}

// get shift by id
const getShiftById = (id) => {
    return shiftRepo.getShift(id)
}

// update shift
const updateShift = (id, shift) => {
    return shiftRepo.updateShift(id, shift)
}

// create new shift
const addShift = (shift) => {
    return shiftRepo.createShift(shift)
}

// create new employee in shift object
const addEmpInShift = (empInShift) => {
    return empInShiftRepo.createEmpInShift(empInShift)
} 

module.exports = {
    getShiftsData,
    getEmpsNotInShift,
    getShiftById,
    getShiftsNotOfEmp,
    updateShift,
    addShift,
    addEmpInShift,

    testFindOne
}