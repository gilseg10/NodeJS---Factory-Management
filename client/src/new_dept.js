import { fetchNotManagers, createDepartment, updateEmployee} from './utils.js';

async function loadData() {
    const name = sessionStorage.getItem("fullName")
    document.getElementById("user_name").innerText = name
    try {
        const not_managers = await fetchNotManagers()
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

    const name = document.getElementById("dept_name").value
    const managerID = document.getElementById("not-managers").value
    // create new deprtment object
    try {
        const {result} = await createDepartment({ name, managerID })
        sessionStorage.setItem("NewDepartment", JSON.stringify(result))
        // console.log(result)

        // update the departmentID of this employee (now department manager)
        const emp_id = managerID
        const departmentID = result._id.valueOf()
        sessionStorage.setItem("departmentID", JSON.stringify(departmentID))
        const updatedEmp = await updateEmployee(emp_id, { departmentID })
        sessionStorage.setItem("updatedEmp", JSON.stringify(updatedEmp))
        window.location.href = "./departments.html"
    } catch (e) {
        console.log(e)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit-form').addEventListener('submit', createDept);

    document.getElementById('backToDepts').addEventListener('click', () => {
        window.location.href = "./departments.html";
    });
});

window.loadData = loadData;