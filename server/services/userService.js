const userRepoJPH = require("../repositories/userRepoJPH")
const userRepoDB = require("../repositories/userRepoDB")
const userRepoJson = require("../repositories/userRepoJson")

// verify if user exists in external web service 
const login = async (user_info) => {
    try {
        // check for username and email in jsonplaceholders
        const jph_user = await userRepoJPH.getUser(user_info)
        // check if user exists in DB using id and name
        const db_user = await userRepoDB.getUser(jph_user)

        return db_user

    } catch (error) {
        throw error
    }
}

const getUsersData = async () => {
    const users_db = await userRepoDB.getAll()
    const users_promises = users_db.map(async user => {
        const result = await getAllowdAction(user._doc.jph_id)
        const actionAllowd = result === -1 ? user.maxActions : result
        return {...user._doc, actionAllowd} 
    })
    return Promise.all(users_promises)
}

const getAllowdAction = async (id) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    
    const data = await userRepoJson.readActions()
    const users_actions = data.actions
    
    const user_actions = users_actions.filter(action => action.id === id && action.date === currentDate)
    if (user_actions.length !==0) {
        const actionsAllowd = user_actions.map(action => action.actionAllowd)
        const actionAllowd = Math.min(...actionsAllowd)
        return actionAllowd
    } else {
        return -1
    } 
}

module.exports = {
    login,
    getUsersData,
    getAllowdAction
}
