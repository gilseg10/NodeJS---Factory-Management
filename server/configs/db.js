const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
    .connect("mongodb://127.0.0.1:27017/node_project")
    .then(() => console.log("Connected to Node Project"))
    .catch((error) =>console.log(error))
}

module.exports = connectDB;
