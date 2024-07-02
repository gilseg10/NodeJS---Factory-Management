const deptService = require("../services/deptService")
const express = require('express');
const jwt = require('jsonwebtoken')

// Entry point of http://localhost:3000/department

const router = express.Router();

// get all departments and their employees
router.get('/', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const departmentsInfo = await deptService.getDeptsData()
        res.send(departmentsInfo)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// get single department basic info
router.get('/:id', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const { id } = req.params
        const departmentInfo = await deptService.getSingleDept(id)
        res.send(departmentInfo)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// get departments names
router.get('/catagory/names', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const departmentNamesIds = await deptService.getDeptsNamesIds()
        res.send(departmentNamesIds)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// get all employees not in a specific department
router.get('/notInDepartment/:id', async (req, res) => {
    try {
        const { id } = req.params
        const employees = await deptService.getEmpsNotInDept(id)
        res.send(employees)
    } catch (e) {
        res.send(e)
    }
})

// Create new department 
router.post('/', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const dept = req.body;
        const result = await deptService.createDept(dept)
        res.status(201).json({result});
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// Update department by id
router.patch('/:id', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const { id } = req.params;
        const dept = req.body
        const result = await deptService.updateDept(id, dept)
        res.json({result})
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// Update employee's department 
router.put('/employee/:emp_id', async (req, res) => {
    try {
        const { emp_id } = req.params;
        const { departmentID } = req.body
        const result = await deptService.updateEmpDept(emp_id, departmentID)
        res.json({result})
    } catch (e) {
        return res.status(401).send(e)
    }
})

router.delete('/:id', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const { id } = req.params
        const result = await deptService.deleteDept(id)
        res.json({result})
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

module.exports = router;