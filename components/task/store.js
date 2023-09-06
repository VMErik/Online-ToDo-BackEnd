const Task = require('./model');
const ObjectId = require('mongoose').Types.ObjectId;

async function addTask(task) {
    const myTask = new Task(task);
    return await myTask.save();
}

async function listTask(id) {
    return await Task.findById(id);
}

async function listTasks() {
    return await Task.find();
}


async function listTasksByUser(id) {
    const query = { user: new ObjectId(id) };
    return await Task.find(query);

}

async function updateTask(id, data) {
    return await Task.findByIdAndUpdate(id, data, { new: true });
}
async function removeTask(id) {
    return await Task.findByIdAndDelete(id, { new: true });
}


module.exports = {
    addTask,
    listTask,
    listTasks,
    updateTask,
    removeTask,
    listTasksByUser
}