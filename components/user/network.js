const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');

const secure = require('./secure');

const router = express.Router();

router.get('/', secure('logged'), list);
router.get('/:id', secure('logged'), getId);
router.post('/', insert);
router.patch('/:id', secure('update'), update);

function list(req, res, next) {
    controller.listUsers()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function getId(req, res, next) {
    const id = req.params.id;
    controller.listUser(id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

function insert(req, res, next) {
    controller.addUser(req.body)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);

}

function update(req, res, next) {
    const id = req.params.id;
    const data = req.body;

    controller.updateUser(id, data)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);

}

module.exports = router;