const shiftService = require("../services/shiftService")
const express = require('express');

// Entry point of http://localhost:3000/shift

const router = express.Router();

// get all shifts and their employees
router.get('/', async (req, res) => {
    try {
        const shiftsinfo = await shiftService.getShiftsData()
        res.send(shiftsinfo)
    } catch (e) {
        res.send(e)
    }
})

// get single shift basic info
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const shiftInfo = await shiftService.getShiftById(id)
        res.send(shiftInfo)
    } catch (e) {
        res.send(e)
    }
})

// get all employees NOT in a shift
router.get('/notInShift/:id', async (req, res) => {
    try {
        const { id } = req.params
        const employees = await shiftService.getEmpsNotInShift(id)
        res.send(employees)
    } catch (e) {
        res.send(e)
    }
})

// get all shifts that dont belong to employee
router.get('/emp/:emp_id', async (req, res) => {
    try {
        const { emp_id } = req.params
        const shifts = await shiftService.getShiftsNotOfEmp(emp_id)
        res.send(shifts)
    } catch (e) {
        res.send(e)
    }
})

// Create new shift 
router.post('/', async (req, res) => {
    try {
        const shift = req.body;
        const result = await shiftService.addShift(shift)
        res.status(201).json({result});
    } catch (e) {
        return res.status(401).send(e)
    }
})

// Create new empInShift 
router.post('/empInShift', async (req, res) => {
    try {
        const empInShift = req.body;
        const result = await shiftService.addEmpInShift(empInShift)
        res.status(201).json({status: "success", ...result});
    } catch (e) {
        return res.status(401).send(e)
    }
})

// Update shift by id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const shift = req.body
        const result = await shiftService.updateShift(id, shift)
        res.status(200).json({
            status: "success",
            ...result
        })
    } catch (e) {
        return res.status(401).send(e)
    }
})

module.exports = router;