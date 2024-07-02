const shiftService = require("../services/shiftService")
const express = require('express');
const jwt = require('jsonwebtoken')

// Entry point of http://localhost:3000/shift

const router = express.Router();

// get all shifts and their employees
router.get('/', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const shiftsinfo = await shiftService.getShiftsData()
        res.send(shiftsinfo)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// get single shift basic info
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const shiftInfo = await shiftService.getShiftById(id)
        res.send(shiftInfo)
    } catch (e) {
        res.status(401).send(e)
    }
})

// get all employees NOT in a shift
router.get('/notInShift/:id', async (req, res) => {
    try {
        const { id } = req.params
        const employees = await shiftService.getEmpsNotInShift(id)
        res.send(employees)
    } catch (e) {
        res.status(401).send(e)
    }
})

// get all shifts that dont belong to employee
router.get('/emp/:emp_id', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const { emp_id } = req.params
        const shifts = await shiftService.getShiftsNotOfEmp(emp_id)
        res.send(shifts)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// Create new shift 
router.post('/', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const shift = req.body;
        const result = await shiftService.addShift(shift)
        res.status(201).json({result});
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// Create new empInShift 
router.post('/empInShift', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const empInShift = req.body;
        const result = await shiftService.addEmpInShift(empInShift)
        res.status(201).json({status: "success", ...result});
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// Update shift by id
router.put('/:id', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const { id } = req.params;
        const shift = req.body
        const result = await shiftService.updateShift(id, shift)
        res.status(200).json({
            status: "success",
            ...result
        })
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

module.exports = router;