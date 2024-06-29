const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String,
    maxActions: Number
}); 

module.exports = mongoose.model("user", userSchema, "user");