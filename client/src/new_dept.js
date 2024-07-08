import { fetchNotManagers, createDepartment, updateEmployee, addAction} from './utils.js';

async function loadData() {
    const name = sessionStorage.getItem("fullName")
    document.getElementById("user_name").innerText = name
    // check if token exist   
    const token = sessionStorage.getItem("token")
    try {
        const not_managers = await fetchNotManagers(token)
        // if message then - 1) No token provided; 2) Invalid token
        if (not_managers.message) {
            window.alert(not_managers.message)
            window.location.href = "./login.html"
        }  
        arrangeData(not_managers)
    } catch (e) {
        console.log(e)
    }
}

function arrangeData(not_managers) {
    const emp_select = document.getElementById('not-managers')
    not_managers.forEach(emp => {
        const empOpt = document.createElement("option")
        empOpt.value = emp.id
        empOpt.text = emp.name
        emp_select.appendChild(empOpt)
    }) 
}

async function createDept(event) {
    event.preventDefault()
    const token = sessionStorage.getItem("token")
    const name = document.getElementById("dept_name").value
    const managerID = document.getElementById("not-managers").value
    // create new deprtment object
    try {
        const result = await createDepartment({ name, managerID }, token)
        // if message then - 1) No token provided; 2) Invalid token
        if (result.message) {
            window.alert(result.message)
            window.location.href = "./login.html"
        } 
        else {
            // check allowd actions
            const user_id = sessionStorage.getItem("id")
            const msg = "Created New Deparment"
            await addActionCheckAllowd(user_id, msg)
            // update the departmentID of this employee (now department manager)
            const emp_id = managerID
            const departmentID = result.result._id.valueOf()
            const updatedEmp = await updateEmployee(emp_id, { departmentID }, token)
            window.alert(msg)
            window.location.href = "./departments.html"
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
    document.getElementById('submit-form').addEventListener('submit', createDept);

    document.getElementById('backToDepts').addEventListener('click', () => {
        window.location.href = "./departments.html";
    });
    document.getElementById('backToLogin').addEventListener('click', () => {
        window.location.href = "./login.html";
    });
});

window.loadData = loadData;