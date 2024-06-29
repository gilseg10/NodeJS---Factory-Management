const axios = require("axios")

const url = "https://jsonplaceholder.typicode.com/users"

// check if user's username and email exists in jsonplaceholders
// and returns id and name to service 
const getUser = async (user_info) => {
    const { username, email } = user_info
    const { data: users } = await axios.get(url)
    
    const match_user = users.find(user => user.username === username && user.email === email)
    if (!match_user) {
        throw Error("Not JsonPlaceHolder user")
    }
    
    return {id: match_user.id, name: match_user.name}
}

module.exports = {
    getUser
}
