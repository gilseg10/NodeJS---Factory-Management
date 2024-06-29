import { createEmployee, fetchDeptsNameId } from './utils.js';


async function loadData() {
    const name = sessionStorage.getItem("fullName")
    document.getElementById("name").innerText = name
    try {
        const depts = await fetchDeptsNameId()
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
    const firstName = document.getElementById("firstName").value
    const lastName = document.getElementById("lastName").value
    const startWorkYear = document.getElementById("startWorkYear").value
    const departmentID = document.getElementById("department").value

    try {
        const result = await createEmployee({ firstName, lastName, startWorkYear, departmentID })
        sessionStorage.setItem("New Emp", JSON.stringify(result))
        window.location.href = "./employees.html"
    } catch (e) {
        console.log(e)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit-form').addEventListener('submit', createEmp);

    document.getElementById('backToEmps').addEventListener('click', () => {
        window.location.href = "./employees.html";
    });
});

window.loadData = loadData;