const deptService = require("../services/deptService")
const express = require('express');

// Entry point of http://localhost:3000/department

const router = express.Router();

// get all departments and their employees
router.get('/', async (req, res) => {
    try {
        const departmentsInfo = await deptService.getDeptsData()
        res.send(departmentsInfo)
    } catch (e) {
        res.send(e)
    }
})

// get single department basic info
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const departmentInfo = await deptService.getSingleDept(id)
        res.send(departmentInfo)
    } catch (e) {
        res.send(e)
    }
})

// get departments names
router.get('/catagory/names', async (req, res) => {
    try {
        const departmentNamesIds = await deptService.getDeptsNamesIds()
        res.send(departmentNamesIds)
    } catch (e) {
        res.send(e)
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
    try {
        const dept = req.body;
        const result = await deptService.createDept(dept)
        res.status(201).json({result});
    } catch (e) {
        return res.status(401).send(e)
    }
})

// Update department by id
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dept = req.body
        const result = await deptService.updateDept(id, dept)
        res.json({result})
    } catch (e) {
        return res.status(401).send(e)
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
    try {
        const { id } = req.params
        const result = await deptService.deleteDept(id)
        res.json({result})
    } catch (e) {
        return res.status(401).send(e)
    }
})

module.exports = router;