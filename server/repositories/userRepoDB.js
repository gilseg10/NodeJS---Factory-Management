const userModel = require("../models/userModel")

// get all users
const getAll = () => {
    return userModel.find()
}

// recive id and name (from jsonPlaceHolder) and return user from DB 
const getUser = async (user_info) => {
    const { id : jph_id } = user_info
    const user = await userModel.findOne({ jph_id })

    if (!user) {
        throw Error('Not registered DB user');
    }

    return user._doc
}

module.exports = {
    getAll,
    getUser,
}
