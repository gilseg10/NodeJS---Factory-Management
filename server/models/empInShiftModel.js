const mongoose = require('mongoose');

// will hold two PK: of employee and shift 
const empInShiftSchema = new mongoose.Schema({
    employeeID: String,
    shiftID: String
}); 

module.exports = mongoose.model("empInShift", empInShiftSchema, "empInShift");