import { fetchDepts } from './utils.js';


async function loadData() {
    const name = sessionStorage.getItem("fullName")
    document.getElementById("name").innerText = name

    // const token = sessionStorage.getItem("token")
    // if (!token) {
    //     window.location.href = "./login.html"
    // }

    try {
        const depts = await fetchDepts()
        arrangeData(depts)
    } catch (e) {
        console.log(e.message)
    }
}

function arrangeData(depts) {
    // arrange employees info in the table
    const tbody = document.getElementById("tbody")

    depts.forEach(dept => {
        const deptTr = document.createElement("tr") // row
        const deptTdName = document.createElement("td") // name cell
        const deptLink = document.createElement("a") 
        const managerTd = document.createElement("td") // mamager name cell
        const managerLink = document.createElement("a")
        let isManager = false
        const empListTd = document.createElement("td") // employee list cell
        const empListUl = document.createElement("ul")
        
        deptLink.innerText = dept.name
        deptLink.href = `edit_dept.html?id=${dept._id.valueOf()}`
        deptTdName.appendChild(deptLink)
        
        dept.employees.forEach(emp => {
            // if manager, arrange manager cell
            if (emp.id === dept.managerID) {
                isManager = true
                managerLink.innerText = emp.name
                managerLink.href = `edit_emp.html?id=${emp.id}`
                managerTd.appendChild(managerLink) 
            } else { // if not manager, arrange in list in employees list cell
                const empNameLi = document.createElement("li")
                const empLink = document.createElement("a")
                empLink.innerText = emp.name
                empLink.href = `edit_emp.html?id=${emp.id}`
                empNameLi.appendChild(empLink)
                empListUl.appendChild(empNameLi)
            }
        })      
        
        if (!isManager) {
            managerTd.innerText = "NO MANAGER"
        }

        empListTd.appendChild(empListUl)
        deptTr.appendChild(deptTdName)
        deptTr.appendChild(managerTd)
        deptTr.appendChild(empListTd)
        tbody.appendChild(deptTr)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newDept').addEventListener('click', () => {
        window.location.href = "./new_dept.html";
    });
    document.getElementById('backToMenuBtn').addEventListener('click', () => {
        window.location.href = "./menu.html";
    });
});

window.loadData = loadData;