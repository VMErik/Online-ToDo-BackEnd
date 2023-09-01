const User = require('./model');

async function addUser(user) {
    const myUser = new User(user);
    return await myUser.save();
}

async function listUser(id) {
    return User.findById(id);
}

async function listUsers() {
    return User.find();
}

async function updateUser(id, data) {
    return User.findByIdAndUpdate(id, data, { new: true });
}

module.exports = {
    addUser,
    listUsers,
    listUser,
    updateUser
}