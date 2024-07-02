import { createEmployee, fetchDeptsNameId, addAction } from './utils.js';


async function loadData() {
    const name = sessionStorage.getItem("fullName")
    document.getElementById("name").innerText = name
    // check if token exist   
    const token = sessionStorage.getItem("token")
    try {
        const depts = await fetchDeptsNameId(token)
        // if message then - 1) No token provided; 2) Invalid token
        if (depts.message) {
            window.alert(depts.message)
            window.location.href = "./login.html"
        }  
        arrangeData(depts)
    } catch (e) {
        console.log(e)
    }
}

function arrangeData(depts) {
    // fill out the department select tag
    const dept_select = document.getElementById("department")
    depts.forEach(dept => {
        const deptOpt = document.createElement("option")
        deptOpt.value = dept.id
        deptOpt.text = dept.name
        dept_select.appendChild(deptOpt)
    })
}

async function createEmp(event) {
    event.preventDefault()
    const user_id = sessionStorage.getItem("id")
    const token = sessionStorage.getItem("token")
    const msg = "Created New Employee"
    await addActionCheckAllowd(user_id, msg)
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const startWorkYear = document.getElementById("startWorkYear").value
    const departmentID = document.getElementById("department").value

    try {
        const result = await createEmployee({ firstName, lastName, startWorkYear, departmentID }, token)
        // if message then - 1) No token provided; 2) Invalid token
        if (result.message) {
            window.alert(result.message)
            window.location.href = "./login.html"
        } else {
            sessionStorage.setItem("New Emp", JSON.stringify(result))
            window.alert(msg)
            window.location.href = "./employees.html"
        }  
    } catch (e) {
        console.log(e)
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
    document.getElementById('submit-form').addEventListener('submit', createEmp);

    document.getElementById('backToEmps').addEventListener('click', () => {
        window.location.href = "./employees.html";
    });
});

window.loadData = loadData;