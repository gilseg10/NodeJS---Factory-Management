const empService = require("../services/empService")
const express = require('express');
const jwt = require('jsonwebtoken')

// Entry point of http://localhost:3000/emps

const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const emps = await empService.getEmpsData();
        res.send(emps);
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// Get employee by id
router.get('/:id', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const { id } = req.params
        const emp = await empService.getEmpById(id)
        res.send(emp)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// Get employees by a specific department
router.get('/department/:dept_id', async (req, res) => {
    try {
        const { dept_id } = req.params;
        const emp = await empService.getEmpsByDepartment(dept_id);
        res.send(emp);
    } catch (e) {
        res.status(401).send(e)
    }
})

// Get all managers names and ids
router.get('/catagory/managers', async (req, res) => {
    try {
        const managers = await empService.getManagers()
        res.send(managers)
    } catch (e) {
        res.status(401).send(e)
    }
})

// Get all not-managers employees
router.get('/catagory/not_managers', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const not_managers = await empService.getNotManagers()
        res.send(not_managers)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// Create new emp 
router.post('/', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const emp = req.body;
        const result = await empService.createEmp(emp)
        res.status(201).json({result});
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// Update employee by id
router.patch('/:id', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const { id } = req.params;
        const emp = req.body
        const updated_emp = await empService.updateEmpById(id, emp)
        const managerCheck = await empService.checkIfManager(id)
        res.status(200).json({
            status: "success",
            ...updated_emp,
            ...managerCheck
        })
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// Delete employee (and his shifts) by id
router.delete('/:id', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const { id } = req.params;
        const result = await empService.deleteEmp(id)
        const managerCheck = await empService.checkIfManager(id)
        res.status(200).json({
            status: "success",
            ...result,
            ...managerCheck
        })
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        console.error('Error deleting employee:', e)
        if (e.name === 'NotFoundError') {
            return res.status(404).send({ error: 'Employee not found' })
        }
        return res.send(e)
    }
})

module.exports = router;