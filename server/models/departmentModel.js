const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: String,
    managerID: String // refrence in studentService HW5 -> dept.managerID === manager._id.valueOf()
}); 

module.exports = mongoose.model("department", departmentSchema, "department");