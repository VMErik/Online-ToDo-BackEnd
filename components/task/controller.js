const Store = require('./store');
const StoreUser = require('../user/store');
const ObjectId = require('mongoose').Types.ObjectId;

async function addTask(task) {
    const { user, title, body, list } = task;
    if (!user || !title) {
        return Promise.reject('Invalid data');
    } else {
        if (ObjectId.isValid(user)) {
            const myUser = await StoreUser.listUser(user);
            console.log(myUser);
            const myTask = {
                user,
                title,
                body,
                list,
                status: 'PENDIENTE'
            };
            return Store.addTask(myTask);
        } else {
            return Promise.reject('Invalid user');
        }
    }
}


async function listTask(id) {
    return new Promise(function(resolve, reject) {
        resolve(Store.listTask(id));
    })
}

async function listTasks() {
    return new Promise(function(resolve, reject) {
        resolve(Store.listTasks());
    })
}

async function updateTask(id, data) {
    return Store.updateTask(id, data, { new: true });
}
async function removeTask(id) {
    return Store.removeTask(id, { new: true });
}

module.exports = {
    listTasks,
    listTask,
    updateTask,
    removeTask,
    addTask
};