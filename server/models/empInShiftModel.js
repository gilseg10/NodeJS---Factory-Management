const mongoose = require('mongoose');

// will hold two PK: of employee and shift 
const empInShiftSchema = new mongoose.Schema({
    employeeID: String,
    shiftID: String
}); 

module.exports = mongoose.model("empInShift", empInShiftSchema, "empInShift");

// dwight - shift 01/06
// "employeeID": "666465d47f90530bca75775e" 
// "shiftID": "666463507f90530bca75775a"

// jim - shift 02/06
// "employeeID": "666466027f90530bca75775f"
// "shiftID": "66646a3d7f90530bca757761"

// pam - shift 02/06
// "employeeID": "66648b2156b0e0f914894031"
// "shiftID": "66646a3d7f90530bca757761"

// ryan - shift 04/06
// "employeeID": "6666d5067f6140d05a5c1503"
// "shiftID": "6666b9dafa64eee52dcfb3bc"

// ryan - shift 05/06
// "employeeID": "6666d5067f6140d05a5c1503"
// "shiftID": "6666b2fdfa64eee52dcfb3b3"
