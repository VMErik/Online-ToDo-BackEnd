const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

// Rutas
router.post('/login', login)


// Funciones
function login(req, res, next) {
    const { username, password } = req.body;
    controller.login(username, password)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch((next));
}


module.exports = router;