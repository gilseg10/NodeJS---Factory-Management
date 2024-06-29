const empService = require("../services/empService")
const express = require('express');

// Entry point of http://localhost:3000/emps

const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
    // const token = req.headers["x-access-token"]
    // if (!token) return res.status(401).json({ message: "No token provided" })

    try {
        // const decoded = jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const emps = await empService.getEmpsData();
        res.send(emps);
    } catch (e) {
        res.send(e);
    }
})

// Get employee by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const emp = await empService.getEmpById(id);
        res.send(emp);
    } catch (e) {
        res.send(e);
    }
})

// Get employees by a specific department
router.get('/department/:dept_id', async (req, res) => {
    try {
        const { dept_id } = req.params;
        const emp = await empService.getEmpsByDepartment(dept_id);
        res.send(emp);
    } catch (e) {
        res.send(e);
    }
})

// Get all managers names and ids
router.get('/catagory/managers', async (req, res) => {
    try {
        const managers = await empService.getManagers()
        res.send(managers)
    } catch (e) {
        res.send(e)
    }
})

// Get all not-managers employees
router.get('/catagory/not_managers', async (req, res) => {
    try {
        const not_managers = await empService.getNotManagers()
        res.send(not_managers)
    } catch (e) {
        res.send(e)
    }
})

// Create new emp 
router.post('/', async (req, res) => {
    try {
        const emp = req.body;
        const result = await empService.createEmp(emp)
        res.status(201).json({result});
    } catch (e) {
        return res.status(401).send(e)
    }
})

// Update employee by id
router.patch('/:id', async (req, res) => {
    try {
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
        return res.send(e)
    }
})

// Delete employee (and his shifts) by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await empService.deleteEmp(id)
        const managerCheck = await empService.checkIfManager(id)
        res.status(200).json({
            status: "success",
            ...result,
            ...managerCheck
        })
    } catch (e) {
        console.error('Error deleting employee:', e);
        if (e.name === 'NotFoundError') {
            return res.status(404).send({ error: 'Employee not found' });
        }
        return res.status(500).send({ error: 'Internal Server Error' });
    }
})

module.exports = router;