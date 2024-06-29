import { fetchUsers } from './utils.js';

async function loadData() {
    const name = sessionStorage.getItem("fullName");
    document.getElementById("name").innerText = name;

    try {
        const users = await fetchUsers();
        arrangeData(users);
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
        userTdRemAc.innerText = user.actionAllowd;

        userTr.appendChild(userTdName);
        userTr.appendChild(userTdMaxAc);
        userTr.appendChild(userTdRemAc);
        tbody.appendChild(userTr);
    });
}

window.loadData = loadData;
