const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const router = express.Router();

// Validaciones
const { validatorLogin } = require('./validators')
const { loginSchema } = require('./schema-validator');
// Rutas
router.post('/login', validatorLogin(loginSchema, "body"), login)
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