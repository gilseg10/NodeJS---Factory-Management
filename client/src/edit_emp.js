import { 
    fetchEmpById, 
    fetchDeptsNameId, 
    fetchUnassigned, 
    updateEmployee,
    deleteEmployee,
    updateDepartment,
    createEmpShift,
    addAction
} from './utils.js';

async function loadData() {
    const name = sessionStorage.getItem("fullName")
    document.getElementById("user_name").innerText = name
    const urlParams = new URLSearchParams(window.location.search);
    const emp_id = urlParams.get('id')
    // check if token exist   
    const token = sessionStorage.getItem("token")
    try {
        const employee = await fetchEmpById(emp_id, token)
        // if message then - 1) No token provided; 2) Invalid token
        if (employee.message) {
            window.alert(employee.message)
            window.location.href = "./login.html"
        } else {
            // fetch department names and ids 
            const depts = await fetchDeptsNameId(token)
            // fetch unassigned shifts of the employee
            const unassignedShifts = await fetchUnassigned(emp_id, token)
            arrangeData(employee, depts, unassignedShifts)
            // check if the page was reloaded or navigated to
            const navigationEntries = performance.getEntriesByType('navigation')
            const navigationEntry = navigationEntries[0];
            if (navigationEntry.type !== 'reload') {
                const user_id = sessionStorage.getItem("id")
                await addActionCheckAllowd(user_id, "Presenting Employee Info")
            }
        } 
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
    const user_id = sessionStorage.getItem("id")
    await addActionCheckAllowd(user_id, "Update Employee Info")
    // send body of employee properties
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const startWorkYear = document.getElementById("startWorkYear").value
    const departmentID = document.getElementById("department").value

    const emp_id = sessionStorage.getItem("emp_id")
    try {
        const token = sessionStorage.getItem("token")
        const result = await updateEmployee(emp_id, {firstName, lastName, startWorkYear, departmentID}, token)
        // if message then - 1) No token provided; 2) Invalid token
        if (result.message) {
            window.alert(result.message)
            window.location.href = "./login.html"
        } else {
            sessionStorage.setItem("updateEmpResult", JSON.stringify(result))
            window.alert(`${firstName} ${lastName} info was updated`)
            // if the employee is manager and we changed his department
            // the department managerID will be updated to ""
            if (result.isManager && result.departmentID !== result.departmentID_change) {
                updateDeptNoManager(result.departmentID_change)
            }
        }  
    } catch (e) {
        console.log(e.message)
    }
}

// delete the employee data and his shifts
async function deleteEmp() {
    const user_id = sessionStorage.getItem("id")
    await addActionCheckAllowd(user_id, "Delete Employee")
    const emp_id = sessionStorage.getItem("emp_id")
    try {
        const token = sessionStorage.getItem("token")
        const result = await deleteEmployee(emp_id, token)
        // if message then - 1) No token provided; 2) Invalid token
        if (result.message) {
            window.alert(result.message)
            window.location.href = "./login.html"
        } else {
            sessionStorage.setItem("deleteResult", JSON.stringify(result))
            // if the employee is manager, the department managerID will be updated to ""
            if (result.isManager) {
                updateDeptNoManager(result.departmentID_change)
            }
            window.alert(`Employee id: ${emp_id} was deleted`)
            window.location.href = "./employees.html"
        } 
    } catch (e) {
        console.log(e.message)
    }
}

// internal function to update the deparment managerID field to "' in case of: 
// 1. delete employee who is manager; 2. assigning (update) manager to a different department
// No check for token beacause it's taken care of in outside function 
async function updateDeptNoManager (dept_id) {
    try{
        const token = sessionStorage.getItem("token")
        const updatedDept = await updateDepartment(dept_id, { managerID: "" }, token)  
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
            const msg = "Created New Employee Shift"
            const user_id = sessionStorage.getItem("id")
            await addActionCheckAllowd(user_id, msg)
            const token = sessionStorage.getItem("token")
            const result = await createEmpShift({ employeeID, shiftID }, token)
            // if message then - 1) No token provided; 2) Invalid token
            if (result.message) {
                window.alert(result.message)
                window.location.href = "./login.html"
            } else {
                window.alert(msg)
                window.location.reload()
            } 
        } catch (e) {
            console.log(e.message)
        }
    } else {
        window.alert("Please choose a shift first!")
    }
}

async function addActionCheckAllowd(user_id ,msg) {
    const result = await addAction(user_id.toString())
    sessionStorage.setItem("actionAllowd", result.action.actionAllowd)
    if (result.action.actionAllowd === 0) {
        window.alert(`Notice! You have exhausted all the actions for today\nLast Action: ${msg}`)
        window.location.href = "./login.html"
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
    document.getElementById('backToLogin').addEventListener('click', () => {
        window.location.href = "./login.html";
    });
});

window.loadData = loadData;