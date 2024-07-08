import { send_login, checkActionAllowd } from './utils.js';

async function login(event) {
    event.preventDefault()
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    
    const data = await send_login({username, email})  
    if (data.status === "success") {
        const res = await checkActionAllowd(data.jph_id)
        if (res.actionAllowd === 0) {
            window.alert("You Have No More Action For Today")
        } else {
            sessionStorage.setItem("token", data.token)
            sessionStorage.setItem("fullName", data.fullName)
            sessionStorage.setItem("id", data.jph_id)
            sessionStorage.setItem("actionAllowd", data.actionAllowd)
            window.location.href = "./menu.html"
        }

    } else {
        console.log({status: data.status, message: data.error})
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit-login').addEventListener('submit', login);
});