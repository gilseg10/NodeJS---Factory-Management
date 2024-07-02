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
        const result = await getAllowdAction(db_user.jph_id)
        const actionAllowd = result.actionAllowd === -1 ? db_user.maxActions : result.actionAllowd

        return {...db_user, actionAllowd}

    } catch (error) {
        throw error
    }
}

// get users data for users table in html
const getUsersData = async () => {
    const users_db = await userRepoDB.getAll()
    const users_promises = users_db.map(async user => {
        const result = await getAllowdAction(user._doc.jph_id)
        const actionAllowd = result.actionAllowd === -1 ? user.maxActions : result.actionAllowd
        return {...user._doc, actionAllowd} 
    })
    return Promise.all(users_promises)
}

// Add action object to actions.json file according to the user id,
// Also, substract 1 from 'actionAllowd' value in that object
const addAction = async (id) => {
    const users_db = await userRepoDB.getAll()
    const user = users_db.find(user => user.jph_id.toString() === id) // return maxActions
    const result = await getAllowdAction(user.jph_id)
    const actionAllowd = result.actionAllowd === -1 ? user.maxActions : result.actionAllowd
    // console.log(typeof actionAllowd)
    return res = await userRepoJson.setAction({
        id: +id, 
        maxActions: user.maxActions,
        date: doCurrentDate(),
        actionAllowd: actionAllowd - 1
    })
}

// return how many actions remains for a user 
const getAllowdAction = async (id) => {
    const data = await userRepoJson.readActions()
    const users_actions = data.actions
    // filter the JSON for according the user's id and today's date
    const user_actions = users_actions.filter(action => action.id === +id && action.date === doCurrentDate())
    if (user_actions.length !==0) { // if the array is NOT empty, return MIN actionAllowd value
        const actionsAllowd = user_actions.map(action => action.actionAllowd)
        const actionAllowd = Math.min(...actionsAllowd)
        return { actionAllowd }
    } else { // if the array is empty, meaning that user didn't use any action today
        return { actionAllowd: -1}
    } 
}

// return today's date 
const doCurrentDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;
    return currentDate
}

module.exports = {
    login,
    getUsersData,
    addAction,
    getAllowdAction
}
