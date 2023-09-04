const express = require('express');
const user = require('../components/user/network');
const tasks = require('../components/task/network');


const routes = function(server) {
    server.use('/user', user);
    server.use('/task', tasks);
}

module.exports = routes;