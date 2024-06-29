import { 
    fetchEmpById, 
    fetchDeptsNameId, 
    fetchUnassigned, 
    updateEmployee,
    deleteEmployee,
    updateDepartment,
    createEmpShift
} from './utils.js';

async function loadData() {
    const name = sessionStorage.getItem("fullName")
    document.getElementById("name").innerText = name

    const urlParams = new URLSearchParams(window.location.search);
    const emp_id = urlParams.get('id')

    try {
        // fetch employee data and his shifts
        const employee = await fetchEmpById(emp_id)
        // fetch department names and ids 
        const depts = await fetchDeptsNameId()
        // fetch unassigned shifts of the employee
        const unassignedShifts = await fetchUnassigned(emp_id)
        arrangeData(employee, depts, unassignedShifts)
    } catch (e) {
        console.log(e.message)
    }
}

function arrangeData(emp, depts, unassignedShifts) {
    // define var in session storage to save emp_id
    sessionStorage.setItem("emp_id", emp._id.valueOf())
    // save also department id

    // fill out the form with the employee data (to be edited)
    const firstName = document.getElementById("firstName")
    firstName.value = emp.firstName
    const lastName = document.getElementById("lastName")
    lastName.value = emp.lastName
    const startWorkYear = document.getElementById("startWorkYear")
    startWorkYear.value = emp.startWorkYear
    // fill out the department select tag
    const dept_select = document.getElementById("department")
    depts.forEach(dept => {
        const deptOpt = document.createElement("option")
        deptOpt.value = dept.id
        deptOpt.text = dept.name
        if (dept.name === emp.department) {
            deptOpt.selected = true
        }
        dept_select.appendChild(deptOpt)
    })
    
    // fill out the table with the employee shifts
    const tbody = document.getElementById("tbody")
    emp.shifts.forEach(shift => {
        const shiftTr = document.createElement("tr")
        const dateTd = document.createElement("td")
        const startTimeTd = document.createElement("td")
        const endTimeTd = document.createElement("td")

        dateTd.innerText = shift.date
        startTimeTd.innerText = shift.startingHour
        endTimeTd.innerText = shift.endingHour

        shiftTr.appendChild(dateTd)
        shiftTr.appendChild(startTimeTd)
        shiftTr.appendChild(endTimeTd)
        tbody.appendChild(shiftTr)
    })

    // fill out the dropdown with all the shifts not assigned to employee
    const select_tag = document.getElementById("emp_shifts")
    unassignedShifts.forEach(shift => {
        const shiftOpt = document.createElement("option")
        shiftOpt.value = shift._id.valueOf()
        shiftOpt.text = shift.date + ": " + shift.startingHour + "-" + shift.endingHour
        select_tag.appendChild(shiftOpt)
    })
}

// update employee data 
async function updateEmp(event) {
    event.preventDefault()
    // send body of employee properties
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const startWorkYear = document.getElementById("startWorkYear").value
    const departmentID = document.getElementById("department").value

    const emp_id = sessionStorage.getItem("emp_id")
    try {
        const result = await updateEmployee(emp_id, {firstName, lastName, startWorkYear, departmentID})
        sessionStorage.setItem("updateEmpResult", JSON.stringify(result))
        window.alert(`${firstName} ${lastName} info was updated`)
    
        // if the employee is manager and we changed his department
        // the department managerID will be updated to ""
        if (result.isManager && result.departmentID !== result.departmentID_change) {
            updateDeptNoManager(result.departmentID_change)
        }
    } catch (e) {
        console.log(e.message)
    }
}

// delete the employee data and his shifts
async function deleteEmp() {
    const emp_id = sessionStorage.getItem("emp_id")
    try {
        const result = await deleteEmployee(emp_id)
        sessionStorage.setItem("deleteResult", JSON.stringify(result))

        // if the employee is manager, the department managerID will be updated to ""
        if (result.isManager) {
            updateDeptNoManager(result.departmentID_change)
        }
        window.alert(`Employee id: ${emp_id} was deleted`)
        window.location.href = "./employees.html"
    } catch (e) {
        console.log(e.message)
    }
}

// internal function to update the deparment managerID field to "' in case of: 
// 1. delete employee who is manager; 2. assigning (update) manager to a different department 
async function updateDeptNoManager (dept_id) {
    try{
        const updatedDept = await updateDepartment(dept_id, { managerID: "" })  
        sessionStorage.setItem("updateResults", JSON.stringify(updatedDept))
    } catch (e) {
        console.log(e)
    }  
}

// when assign new shift for employee, new empInShift object is created and saved
async function createNewEmpShift() {
    const employeeID = sessionStorage.getItem("emp_id")
    const shiftID = document.getElementById("emp_shifts").value
    if (shiftID !== "") {
        try {
            const result = await createEmpShift({ employeeID, shiftID })
            window.location = window.location.href
        } catch (e) {
            console.log(e.message)
        }
    } else {
        window.alert("Please choose a shift first!")
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit-form').addEventListener('submit', updateEmp);

    document.getElementById('newShift').addEventListener('click', createNewEmpShift);

    document.getElementById('deleteEmp').addEventListener('click', deleteEmp);

    document.getElementById('backToEmps').addEventListener('click', () => {
        window.location.href = "./employees.html";
    });
    document.getElementById('backToDepts').addEventListener('click', () => {
        window.location.href = "./departments.html";
    });
    document.getElementById('backToShifts').addEventListener('click', () => {
        window.location.href = "./shifts.html";
    });
});

window.loadData = loadData;