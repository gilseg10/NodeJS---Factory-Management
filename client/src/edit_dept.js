import { 
    fetchDeptById,
    fetchEmpInDept,
    fetchEmpsNotDept,
    updateDepartment,
    updateEmployee,
    deleteDepartment,
    addAction
} from './utils.js';

async function loadData() {
    const name = sessionStorage.getItem("fullName")
    document.getElementById("user_name").innerText = name
    const urlParams = new URLSearchParams(window.location.search);
    const dept_id = urlParams.get('id')
    // check if token exist   
    const token = sessionStorage.getItem("token")
    try {
        // fetch department data
        const department = await fetchDeptById(dept_id, token)
        // if message then - 1) No token provided; 2) Invalid token
        if (department.message) {
            window.alert(department.message)
            window.location.href = "./login.html"
        } else {
            // fetch department employees 
            const assignedEmps = await fetchEmpInDept(dept_id, token)
            // fetch employees not in the department
            const unassignedEmps = await fetchEmpsNotDept(dept_id, token)
            arrangeData(department, assignedEmps, unassignedEmps)
             // check if the page was reloaded or navigated to
             const navigationEntries = performance.getEntriesByType('navigation')
             const navigationEntry = navigationEntries[0];
             if (navigationEntry.type !== 'reload') {
                 const user_id = sessionStorage.getItem("id")
                 await addActionCheckAllowd(user_id, "Presenting Department Info")
             }
        } 
    } catch (e) {
        console.log(e.message)
    }
}

function arrangeData(department, assignedEmps, unassignedEmps) {
    // define var in session storage to save dept_id
    sessionStorage.setItem("dept_id", department._id.valueOf())
    // fill the depatment name 
    const dept_name = document.getElementById("name")
    dept_name.value = department.name
    // fill out the manager field and department employees select tag
    const manager_name = document.getElementById("managerName")
    const manager_select = document.getElementById("empName")
    assignedEmps.forEach(emp => {
        if (emp._id.valueOf() === department.managerID) {
            manager_name.value = emp.firstName + " " + emp.lastName
        } else {
            const empOpt = document.createElement("option")
            empOpt.value = emp._id.valueOf()
            empOpt.text = emp.firstName + " " + emp.lastName
            manager_select.appendChild(empOpt)
        }
    })
    // fill out the select with all the employees not assigned to department
    const empSelect_tag = document.getElementById("notBelongEmps")
    unassignedEmps.forEach(emp => {
        const empOpt = document.createElement("option")
        empOpt.value = emp.id
        empOpt.text = emp.name
        empSelect_tag.appendChild(empOpt)
    })
}

// changing department info
async function updateDept(event) {
    event.preventDefault()
    const user_id = sessionStorage.getItem("id")
    const token = sessionStorage.getItem("token")
    await addActionCheckAllowd(user_id, "Update Department Info")
    const name = document.getElementById("name").value
    const managerID = document.getElementById("empName").value
    // if different manager didn't selected, we want to send only the name
    const body_obj = managerID === '' ? { name } : {name, managerID}
    
    const dept_id = sessionStorage.getItem("dept_id")
    try {
        const result = await updateDepartment(dept_id, body_obj, token)
        // if message then - 1) No token provided; 2) Invalid token
        if (result.message) {
            window.alert(result.message)
            window.location.href = "./login.html"
        } else {
            sessionStorage.setItem("updatedDept", JSON.stringify(result))
            window.alert(`${name} Department info was updated`)
        }
    } catch (e) {
        console.log(e.message)
    }
}

// assigning other department employee to this department
async function changeDeptforEmp() {
    const departmentID = sessionStorage.getItem("dept_id")
    const token = sessionStorage.getItem("token")
    const emp_id = document.getElementById("notBelongEmps").value
    if (emp_id === '') {
        window.alert("You didnt chose any employee")
    } else {
        const user_id = sessionStorage.getItem("id")
        await addActionCheckAllowd(user_id, "Assign Employee To Department")
        try {
            const result = await updateEmployee(emp_id, { departmentID }, token)  
            // if message then - 1) No token provided; 2) Invalid token
            if (result.message) {
                window.alert(result.message)
                window.location.href = "./login.html"
            } else {
                sessionStorage.setItem("updateResults", JSON.stringify(result))
                window.alert(`Employee id: ${emp_id} was assign to this department`)
                window.location.reload()
            }  
        } catch (e) {
            console.log(e.message)
        }
    }
}

async function deleteDept() {
    const user_id = sessionStorage.getItem("id")
    const token = sessionStorage.getItem("token")
    await addActionCheckAllowd(user_id, "Delete Department With Related Employees")
    const dept_id = sessionStorage.getItem("dept_id")
    try {
        const result = await deleteDepartment(dept_id, token)
        if (result.message) {
            window.alert(result.message)
            window.location.href = "./login.html"
        } else {
            sessionStorage.setItem("deleteDeprtment", JSON.stringify(result))
            window.alert(`Department id: ${dept_id} was deleted with all it's employees`)
            window.location.href = "./departments.html"
        }
    } catch (e) {
        console.log(e.message)
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
    document.getElementById('submit-form').addEventListener('submit', updateDept);

    document.getElementById('changeDept').addEventListener('click', changeDeptforEmp);

    document.getElementById('deleteDept').addEventListener('click', deleteDept);

    document.getElementById('backToEmps').addEventListener('click', () => {
        window.location.href = "./employees.html";
    });
    document.getElementById('backToDepts').addEventListener('click', () => {
        window.location.href = "./departments.html";
    });
});

window.loadData = loadData;