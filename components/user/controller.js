const Store = require('./store');
const bcrypt = require('bcrypt');


function listUser(id) {
    return new Promise(function(resolve, reject) {
        resolve(Store.listUser(id));
    })
}

function listUsers() {
    return new Promise(function(resolve, reject) {
        resolve(Store.listUsers());
    })
}

async function addUser(data) {
    const { name, username, password, email } = data;
    if (!name || !username || !password || !email) {
        return Promise.reject('Invalid data');
    } else {
        const mySecurePass = await bcrypt.hash(password, 6);
        const myUser = {
            name,
            username,
            password: mySecurePass,
            email
        };
        return Store.addUser(myUser);
    }
}

function updateUser(id, data) {
    const { name, username, password, email } = data;
    if (!name || !username || !password || !email || !id) {
        return Promise.reject('Invalid data');
    } else {

        const myUser = {
            name,
            username,
            email
        };
        return Store.updateUser(id, myUser);
    }
}


module.exports = {
    addUser,
    listUsers,
    listUser,
    updateUser
}