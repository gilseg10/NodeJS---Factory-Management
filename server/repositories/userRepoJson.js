const jsonfile = require("jsonfile");

const FILE = './data/actions.json';
const readActions = async () => {
    const data = await jsonfile.readFile(FILE);
    return data
}

const setAction = async (action) => {
    const data = await jsonfile.readFile(FILE);
    data.actions.push(action)
    await jsonfile.writeFile(FILE, data)
    return {status: "success", action}
}

module.exports = {
    readActions,
    setAction
}