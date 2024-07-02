import { 
    fetchShifts, 
    createEmpShift, 
    updateShift,
    createShift,
    addAction 
} from "./utils.js"

async function loadData() {
    const name = sessionStorage.getItem("fullName")
    document.getElementById("name").innerText = name

    // const token = sessionStorage.getItem("token")
    // if (!token) {
    //     window.location.href = "./login.html"
    // }

    try {
        const shifts = await fetchShifts()
        arrangeData(shifts)
        // check if the page was reloaded or navigated to
        const navigationEntries = performance.getEntriesByType('navigation')
        const navigationEntry = navigationEntries[0];
        if (navigationEntry.type !== 'reload') {
            const user_id = sessionStorage.getItem("id")
            await addActionCheckAllowd(user_id, "Presenting Shifts Page")
        }
    } catch (e) {
        console.log(e.message)
    }
}

function arrangeData(shifts) {
    // arrange employees info in the table
    const tbody = document.getElementById("tbody")

    // arranging time input for start and end times 
    shifts.forEach(shift => {
        const shiftTr = document.createElement("tr") // row
        shiftTr.id = shift._id.valueOf()
        const shiftTdDate = document.createElement("td") // date cell
        const shiftTdStart = document.createElement("td") // start hour cell
        const shiftTdEnd = document.createElement("td") // end hour cell
        const shiftInputs = createTimeInput(shift.date, shift.startingHour, shift.endingHour)
        shiftTdDate.appendChild(shiftInputs[0]) // date input inside td
        shiftTdStart.appendChild(shiftInputs[1]) // starting hour input inside td
        shiftTdEnd.appendChild(shiftInputs[2]) // ending hour input inside td

        // arranging list of employees in this shift
        const empsTd = document.createElement("td") // employees names cell
        const empList = document.createElement("ul") // employees names list                    
        shift.employees.forEach(emp => {
            const empNameLi = document.createElement("li")
            const empLink = document.createElement("a")
            empLink.innerText = emp.name
            empLink.href = `edit_emp.html?id=${emp.id}`
            empNameLi.appendChild(empLink)
            empList.appendChild(empNameLi)
        })
        empsTd.appendChild(empList)
        
        // arranging select tag for not-assigned employees
        const registerTd = document.createElement("td") // register other emps cell
        const registerTdDiv = document.createElement("div")
        registerTdDiv.className = "register-td"
        const selectTag = document.createElement("select") // register other emps select
        selectTag.id = shift._id.valueOf() + "_select"
        shift.empsNotInShift.forEach(emp => {
            const empName = document.createElement("option")
            empName.innerText = emp.name
            empName.value = emp.id
            selectTag.appendChild(empName)
        })
        const registerBtn = document.createElement("button")
        registerBtn.innerText = 'Register'
        registerBtn.addEventListener('click', async () => await registerEmp(`${shift._id.valueOf()}`))
        registerTdDiv.appendChild(selectTag)
        registerTdDiv.appendChild(registerBtn)
        registerTd.appendChild(registerTdDiv)
        
        // shiftTr.appendChild(shiftTdDate)
        shiftTr.appendChild(shiftTdDate)
        shiftTr.appendChild(shiftTdStart)
        shiftTr.appendChild(shiftTdEnd)
        shiftTr.appendChild(empsTd)
        shiftTr.appendChild(registerTd)
        tbody.appendChild(shiftTr)
    })
}


async function registerEmp(shiftID) {
    const employeeID = document.getElementById(shiftID+'_select').value
    const user_id = sessionStorage.getItem("id")
    await addActionCheckAllowd(user_id, "Registerd Employee To Shift")
    try {
        const result = await createEmpShift({ shiftID, employeeID })
        sessionStorage.setItem("New EmpShift", JSON.stringify(result))
        window.location.reload()
    } catch (e) {
        console.log(e)
    }
}

async function saveChanges() {
    const user_id = sessionStorage.getItem("id")
    await addActionCheckAllowd(user_id, "Update Shifts Info")
    const dom_shifts = document.getElementById("tbody").children
    // let shifts = []
    for (let i = 0; i < dom_shifts.length; i++) {
        const dom_shift = dom_shifts[i]
        const id = dom_shift.id
        const dateInput = dom_shift.cells[0].children[0].value // yyyy-mm-dd
        const startingHour = dom_shift.cells[1].children[0].value // hh:mm
        const endingHour = dom_shift.cells[2].children[0].value // hh:mm
        const date = dateInput.split('-').reverse().join('/') // dd/mm/yyyy
        
        if (startingHour < endingHour) {
            try {
                const updatedShift = await updateShift(id, { date, startingHour, endingHour }) 
                console.log(updatedShift)
            } catch (e) {
                console.log(e)
            }
        } else {
            window.alert("Highlighted shifts has start time AFTER end time")
            const row = document.getElementById(`${id}`)
            const startTimeInput = row.children[1].children[0]
            highlight(startTimeInput)
            const endTimeInput = row.children[2].children[0]
            highlight(endTimeInput)
        }
    }
}

async function createNewShift(event) {
    event.preventDefault()
    const user_id = sessionStorage.getItem("id")
    await addActionCheckAllowd(user_id, "Created New Shift")
    const shiftDate = document.getElementById("date").value
    const date = shiftDate.split('-').reverse().join('/')
    const startingHour = document.getElementById("shift-start").value
    const endingHour = document.getElementById("shift-end").value
    if (startingHour < endingHour) {
        try {
            const result = await createShift({ date, startingHour, endingHour })
            sessionStorage.setItem("New Shift", JSON.stringify(result))
            window.location.reload()
        } catch (e) {
            console.log(e)
        }
    } else if (startingHour !== '' && endingHour !== '') {
        window.alert("start time must be earlier then end time")
    }
   
}

function createTimeInput(date, startTime, endTime) {
    // transition form dd/mm/yy to yy-mm-dd
    const formatDate = date.split('/').reverse().join('-')
    const date_input = document.createElement("input")
    date_input.type = "date"
    date_input.value = formatDate
    // startTime input
    const start_input = document.createElement("input")
    start_input.type = "time"
    start_input.value = startTime
    // endTime input
    const end_input = document.createElement("input")
    end_input.type = "time"
    end_input.value = endTime
    return [date_input, start_input, end_input]
}

function highlight(obj) {
    var orig = obj.style.backgroundColor
    obj.style.backgroundColor = '#f07486'
    setTimeout(function(){
        obj.style.backgroundColor = orig
    }, 5000)
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
    document.getElementById('saveChanges').addEventListener('click', saveChanges);

    document.getElementById('submit-form').addEventListener('submit', createNewShift);

    document.getElementById('backToMenuBtn').addEventListener('click', () => {
        window.location.href = "./menu.html";
    });
});

window.loadData = loadData;