const express = require('express');
const user = require('../components/user/network');
const tasks = require('../components/task/network');
const auth = require('../components/auth/network');


const routes = function(server) {
    server.use('/user', user);
    server.use('/task', tasks);
    server.use('/auth', auth);

}

module.exports = routes;