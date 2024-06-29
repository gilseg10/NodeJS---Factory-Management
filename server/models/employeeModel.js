const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    startWorkYear: Number,
    departmentID: String
}); 

module.exports = mongoose.model("employee", employeeSchema, "employee");