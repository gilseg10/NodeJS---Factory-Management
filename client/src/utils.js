// -------------- Users End Points --------------

const users_route = "http://localhost:3000/users"

const fetchUsers = async (token) => {
    try {
        const resp = await fetch(users_route, {
            method: "GET",
            headers: { "x-access-token": token }
        })
        const users = await resp.json()
        return users
    } catch (e) {
        console.log(e.message)
    }
}

const checkActionAllowd = async (jph_id) => {
    try {
        const resp = await fetch(`${users_route}/actionAllowd/${jph_id}`, {
            method: "GET",
        })
        const actionAllowd = await resp.json()
        return actionAllowd
    } catch (e) {
        console.log(e.message)
    }
}

const send_login = async (user_cred) => {
    try {
        const resp = await fetch(users_route + '/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user_cred)
        })
        const data = await resp.json()
        return data
    } catch (e) {
        console.log(e.message)
    }
}

const addAction = async (user_id) => {
    // // DUMMY - disconnect actions
    // return {action: {actionAllowd: 1}}
    try {
        const resp = await fetch(users_route + '/' + user_id, {
            method: "GET",
        })
        const action = await resp.json()
        return action
    } catch (e) {
        console.log(e.message)
    }
}

// -------------- Employees End Points --------------

const emp_route = "http://localhost:3000/emps"

const fetchEmps = async (token) => {
    try {
        const resp = await fetch(emp_route, {
            method: "GET",
            headers: { "x-access-token": token }
        })
        const emps = await resp.json()
        return emps
    } catch (e) {
        console.log(e.message)
    }
}

const fetchEmpById = async (id, token) => {
    try {
        const resp = await fetch(emp_route + '/' + id, {
            method: "GET",
            headers: { "x-access-token": token }
        })
        const employee = await resp.json()
        return employee
    } catch (e) {
        console.log(e.message)
    }
}

const fetchEmpInDept = async (dept_id, token) => {
    try {
        const resp = await fetch(emp_route + '/department/' + dept_id, {
            method: "GET",
            headers: { "x-access-token": token }
        })
        const assignedEmps = await resp.json()
        return assignedEmps
    } catch (e) {
        console.log(e.message)
    }
}

const fetchNotManagers = async (token) => {
    try {
        const resp = await fetch(emp_route + '/catagory/not_managers', {
            method: "GET",
            headers: { "x-access-token": token }
        })
        const not_managers = await resp.json()
        return not_managers
    } catch (e) {
        console.log(e.message)
    }
}

const createEmployee = async (emp, token) => {
    try {
        const resp = await fetch(`${emp_route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({ ...emp })
        })
        const result = await resp.json()
        return result
    } catch (e) {
        console.log(e)
    }
}

const updateEmployee = async (id, emp, token) => {
    try {
        const resp = await fetch(`${emp_route}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({ ...emp })
        })
        const result = await resp.json()
        return result
    } catch (e) {
        console.log(e.message)
    }
}

const deleteEmployee = async (id, token) => {
    try {
        const resp = await fetch(`${emp_route}/${id}`, {
            method: "DELETE",
            headers: { "x-access-token": token }
        })
        const result = await resp.json()
        return result
    } catch (e) {
        console.log(e.message)
    }
}

// -------------- Departments End Points --------------

const dept_route = "http://localhost:3000/department"

const fetchDepts = async (token) => {
    try {
        let resp = await fetch(dept_route, {
            method: "GET",
            headers: { "x-access-token": token }
        })
        const depts = await resp.json()
        return depts
    } catch (e) {
        console.log(e.message)
    }
}

const fetchDeptById = async (id, token) => {
    try {
        let resp = await fetch(dept_route + '/' + id, {
            method: "GET",
            headers: { "x-access-token": token }
        })
        const department = await resp.json()
        return department
    } catch (e) {
        console.log(e.message)
    }
}

const fetchDeptsNameId = async (token) => {
    try {
        const resp = await fetch(dept_route + '/catagory/names', {
            method: "GET",
            headers: { "x-access-token": token }
        })
        const depts_name_id = await resp.json()
        return depts_name_id
    } catch (e) {
        console.log(e.message)
    }
}

const fetchEmpsNotDept = async (id, token) => {
    try {
        const resp = await fetch(dept_route + '/notInDepartment/' + id, {
            method: "GET",
            headers: { "x-access-token": token }
        })
        const unassignedEmps = await resp.json()
        return unassignedEmps
    } catch (e) {
        console.log(e.message)
    }
}

const createDepartment = async (dept, token) => {
    try {
        const resp = await fetch(`${dept_route}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({ ...dept })
        })
        const department = await resp.json()
        return department
    } catch (e) {
        console.log(e)
    }
}

const updateDepartment = async (id, dept, token) => {
    try{
        const resp = await fetch(`http://localhost:3000/department/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({ ...dept })
        })
        const updatedDept = await resp.json()
        return updatedDept
    } catch (e) {
        console.log(e)
    }  
}

const deleteDepartment = async (id, token) => {
    try {
        const resp = await fetch(`${dept_route}/${id}`, {
            method: "DELETE",
            headers: { "x-access-token": token }
        })
        const result = await resp.json()
        return result
    } catch (e) {
        console.log(e.message)
    }
}

// -------------- Shifts End Points --------------

const shift_route = "http://localhost:3000/shift"

const fetchShifts = async (token) => {
    try {
        let resp = await fetch(shift_route, {
            method: "GET",
            headers: { "x-access-token": token }
        })
        const shifts = await resp.json()
        return shifts
    } catch (e) {
        console.log(e.message)
    }
}

const fetchUnassigned = async (id, token) => {
    try {
        const resp = await fetch(shift_route + '/emp/' + id, {
            method: "GET",
            headers: { "x-access-token": token }
        })
        const depts_name_id = await resp.json()
        return depts_name_id
    } catch (e) {
        console.log(e.message)
    }
}

const createShift = async (shift, token) => {
    try {
        const resp = await fetch(shift_route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({ ...shift })
        })
        const result = await resp.json()
        return result
    } catch (e) {
        console.log(e)
    }
}

const createEmpShift = async (empShift, token) => {
    try {
        const resp = await fetch(`${shift_route}/empInShift`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({ ...empShift })
        })
        const result = await resp.json()
        return result
    } catch (e) {
        console.log(e.message)
    }
}

const updateShift = async (id, shift, token) => {
    try {
        const resp = await fetch(`${shift_route}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token
            },
            body: JSON.stringify({ ...shift })
        })
        const updatedShift = await resp.json() 
        return updatedShift
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    fetchUsers,
    checkActionAllowd,
    send_login,
    addAction,

    fetchEmps,
    fetchEmpById,
    fetchEmpInDept,
    fetchNotManagers,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    
    fetchDepts,
    fetchDeptById,
    fetchDeptsNameId,
    fetchEmpsNotDept,
    createDepartment,
    updateDepartment,
    deleteDepartment,

    fetchShifts,
    fetchUnassigned,
    createShift,
    createEmpShift,
    updateShift
}