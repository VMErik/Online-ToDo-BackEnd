const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

router.get('/', list);
router.get('/:id', getId);
router.post('/', insert);
router.patch('/:id', update);

function list(req, res) {
    controller.listUsers()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal Error', 500, err);
        });
}

function getId(req, res) {
    const id = req.params.id;
    controller.listUser(id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal Error', 500, err);
        });
}

function insert(req, res) {
    controller.addUser(req.body)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal Error', 500, err);
        });
}

function update(req, res) {
    const id = req.params.id;
    const data = req.body;
    controller.updateUser(id, data)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal Error', 500, err);
        });
}

module.exports = router;