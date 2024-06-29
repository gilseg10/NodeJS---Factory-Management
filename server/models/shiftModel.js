const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
    date: String,
    startingHour: String,
    endingHour: String,
    // employeesID: [String] // array of strings to store the IDs of employees in that shift 
}); 

module.exports = mongoose.model("shift", shiftSchema, "shift");
