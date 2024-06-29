const express = require('express');
const cors = require('cors');
const connectDB = require("./configs/db")
const empController = require("./controllers/empController");
const deptController = require("./controllers/deptController");
const shiftController = require("./controllers/shiftController");
const userController = require("./controllers/userController");

const app = express();
const port = 3000;

connectDB()

// will parse JSON sent in the body request
app.use(express.json())
app.use(cors())

app.use('/emps', empController);
app.use('/department', deptController)
app.use('/shift', shiftController)
app.use('/users', userController)

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`)
});