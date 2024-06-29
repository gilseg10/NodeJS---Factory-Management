import { fetchEmps, fetchDeptsNameId } from './utils.js';

async function loadData() {
    const name = sessionStorage.getItem("fullName")
    document.getElementById("name").innerText = name

    // const token = sessionStorage.getItem("token")
    // if (!token) {
    //     window.location.href = "./login.html"
    // }

    try {
        const emps = await fetchEmps()
        const depts_name_id = await fetchDeptsNameId()
        arrangeData(emps, depts_name_id)
    } catch (e) {
        console.log(e.message)
    }
}

function arrangeData(emps, depts_name_id) {
    // arrange employees info in the table
    const tbody = document.getElementById("tbody")

    emps.forEach(emp => {
        const empTr = document.createElement("tr")
        const empTdName = document.createElement("td")
        const empLink = document.createElement("a")
        const empTdDept = document.createElement("td")
        const deptLink = document.createElement("a")
        const empTdShifts = document.createElement("td")
        const empUlShifts = document.createElement("ul")
        emp.shifts.forEach(shift => {
            const shiftIL = document.createElement("li")
            shiftIL.innerText = shift.date + ": " + shift.startingHour + "-" + shift.endingHour
            empUlShifts.appendChild(shiftIL)
        })
            
            // editButton.onclick = () => {
            //     sessionStorage.setItem("prodData", JSON.stringify(prod))
            
            //     window.location.href = "./addOrUpdate.html"
            // }
                
                

        empLink.innerText = emp.name
        empLink.href = `edit_emp.html?id=${emp.id}`
        empTdName.appendChild(empLink)
        deptLink.innerText = emp.department
        deptLink.href = `edit_dept.html?id=${emp.departmentID}`
        empTdDept.appendChild(deptLink) 
        empTr.value = emp.department // for the search filter
        empTdShifts.appendChild(empUlShifts)
        empTr.appendChild(empTdName)
        empTr.appendChild(empTdDept)
        empTr.appendChild(empTdShifts)


        tbody.appendChild(empTr)

    })

    // arrange department names in the dropdown
    const select_tag = document.getElementById("departments")
    depts_name_id.forEach(dept => {
        const nameOpt = document.createElement("option")
        nameOpt.text = dept.name
        nameOpt.value = dept.name
        select_tag.appendChild(nameOpt)
    })
}

function filterEmps() {
    const department_name = document.getElementById("departments").value
    const tbody = document.getElementById("tbody")
    for (const row of tbody.children) {
        if (department_name === "") {
            row.style.display = ""
        } else if (row.value !== department_name) {
            row.style.display = "none"
        } 
        else {
            row.style.display = ""
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('newEmployeeBtn').addEventListener('click', () => {
        window.location.href = "./new_emp.html";
    });

    document.getElementById('departments').addEventListener('change', filterEmps);

    document.getElementById('backToMenuBtn').addEventListener('click', () => {
        window.location.href = "./menu.html";
    });
});

window.loadData = loadData;