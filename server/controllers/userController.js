const userService = require("../services/userService")
const express = require('express')
const jwt = require('jsonwebtoken')

// Entry point of http://localhost:3000/users

const router = express.Router();

const createSendToken = (user, res) => {
    const id = user._id
    // sign on _id from MongoDB
    const token = jwt.sign({ id }, `$(process.env.JWT_SECRET)`, { expiresIn: '90d'})

    res.status(201).json({
        status: "success",
        ...user,
        token
    })
}

router.post('/login', async (req, res) => {
    try {
        const {username, email} = req.body
        const user = await userService.login({username, email})

        // create and send token
        createSendToken(user, res)
    } catch (e) {
        res.status(400).json({
            status: "fail",
            error: e.message
        })
    }
})

// get all users data: fullName, jph_id, maxActions and remaining actions 
router.get('/', async (req, res) => {
    const token = req.headers["x-access-token"]
    try {
        jwt.verify(token, `$(process.env.JWT_SECRET)`)
        const users = await userService.getUsersData()
        res.send(users)
    } catch (e) {
        if (e.name === 'JsonWebTokenError') {
            const msg = e.message === 'jwt malformed' ? "No token provided" : "Invalid token" 
            return res.status(401).json({message: msg})  
        }
        res.status(401).send(e)
    }
})

// route for adding action object in json
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const action = await userService.addAction(id)
        res.send(action)
    } catch (e) {
        res.send(e)
    }
})

router.get('/actionAllowd/:id', async (req, res) => {
    try {
        const { id } = req.params
        const actionAllowd = await userService.getAllowdAction(id)
        res.send(actionAllowd)
    } catch (e) {
        res.send(e)
    }
})

module.exports = router