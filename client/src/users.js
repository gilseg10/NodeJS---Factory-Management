import { fetchUsers, addAction } from './utils.js';

async function loadData() {
    const name = sessionStorage.getItem("fullName");
    document.getElementById("user_name").innerText = name;
    const token = sessionStorage.getItem("token")
    try {
        const users = await fetchUsers(token)
        // if message then - 1) No token provided; 2) Invalid token
        if (users.message) {
            window.alert(users.message)
            window.location.href = "./login.html"
        } else {
            arrangeData(users)
            // check if the page was reloaded or navigated to
            const navigationEntries = performance.getEntriesByType('navigation')
            const navigationEntry = navigationEntries[0];
            // if just reloaded, dont count as action
            if (navigationEntry.type !== 'reload') {
                const user_id = sessionStorage.getItem("id")
                await addActionCheckAllowd(user_id, "Presenting Users Page")
            }
        }
    } catch (e) {
        console.log(e.message);
    }
}

function arrangeData(users) {
    const tbody = document.getElementById("tbody");

    users.forEach(user => {
        const userTr = document.createElement("tr");
        const userTdName = document.createElement("td");
        userTdName.innerText = user.fullName;
        const userTdMaxAc = document.createElement("td");
        userTdMaxAc.innerText = user.maxActions;
        const userTdRemAc = document.createElement("td");
        const user_id = sessionStorage.getItem("id")
        // including this action for the active user
        userTdRemAc.innerText = +user_id === user.jph_id ? user.actionAllowd - 1 : user.actionAllowd  
        userTr.appendChild(userTdName);
        userTr.appendChild(userTdMaxAc);
        userTr.appendChild(userTdRemAc);
        tbody.appendChild(userTr);
    });
}

async function addActionCheckAllowd(user_id ,msg) {
    const result = await addAction(user_id.toString())
    sessionStorage.setItem("actionAllowd", result.action.actionAllowd)
    if (result.action.actionAllowd === 0) {
        window.alert(`Notice! You have exhausted all the actions for today\nLast Action: ${msg}`)
        window.location.href = "./login.html"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('backToMenuBtn').addEventListener('click', () => {
        window.location.href = "./menu.html";
    });
    document.getElementById('backToLogin').addEventListener('click', () => {
        window.location.href = "./login.html";
    });
});

window.loadData = loadData;
