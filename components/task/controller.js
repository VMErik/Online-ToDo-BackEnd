const Store = require('./store');
const StoreUser = require('../user/store');
const ObjectId = require('mongoose').Types.ObjectId;
const nanoid = require('nanoid');

async function addTask(task) {
    const { user, title, body, list } = task;
    if (!user || !title) {
        return Promise.reject('Invalid data');
    } else {
        if (ObjectId.isValid(user)) {
            const myUser = await StoreUser.listUser(user);
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
async function listTasksByUser(id) {

    if (ObjectId.isValid(id)) {
        return new Promise(function(resolve, reject) {
            resolve(Store.listTasksByUser(id));
        })
    } else {
        return Promise.reject('Invalid user');
    }
}


async function updateTask(id, data) {
    return Store.updateTask(id, data, { new: true });
}

async function removeTask(id) {
    return Store.removeTask(id, { new: true });
}


async function insertSubTask(idTask, data) {
    // Obtenemos la tarea principal
    let task = await Store.listTask(idTask);
    if (task) {
        const { subtask } = data;
        const newSubtask = {
            id: nanoid(),
            completed: false,
            subtask
        };
        task.list.push(newSubtask);
        return Store.updateTask(idTask, task, { new: true });
    } else {
        return Promise.reject('Invalid Task Id');
    }

}


async function removeSubtask(idTask, idSubTask) {
    // Obtenemos la tarea principal
    let task = await Store.listTask(idTask);
    if (task) {
        const subtasks = task.list.find(subtask => subtask.id !== idSubTask);
        task.list = subtasks;
        return Store.updateTask(idTask, task, { new: true })
    } else {
        return Promise.reject('Invalid Task Id');
    }
}

async function updateSubTask(idTask, idSubTask, data) {
    // Obtenemos la tarea principal
    let task = await Store.listTask(idTask);
    if (task) {
        const subTask = task.list.find(subtask => subtask.id === idSubTask);
        if (subTask) {
            const { completed, subtask } = data;
            const index = task.list.indexOf(subTask);
            subTask.completed = completed;
            subTask.subtask = subtask;
            task.list[index] = subTask;
            return Store.updateTask(idTask, task, { new: true })
        } else {
            return Promise.reject('Invalid SubTask Id');
        }
    } else {
        return Promise.reject('Invalid Task Id');
    }
}



module.exports = {
    listTasks,
    listTasksByUser,
    listTask,
    updateTask,
    removeTask,
    addTask,
    insertSubTask,
    removeSubtask,
    updateSubTask
};