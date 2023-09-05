const express = require('express')
const controller = require('./controller');
const response = require('../../network/response');

const router = express.Router();

// Tasks
router.get('/', list);
router.get('/:id', getId);
router.post('/', insert);
router.patch('/:id', update);
router.delete('/:id', remove);

// Subtasks
router.post('/:idTask/Add/', insertSubTask);
router.patch('/:idTask/Update/:idSubtask', updateSubTask);
router.delete('/:idTask/Remove/:idSubtask', deleteSubTask);

function list(req, res) {
    controller.listTasks()
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(error => {
            response.error(req, res, 'Internal Error', 500, error);
        });
}


function getId(req, res) {
    const id = req.params.id;
    controller.listTask(id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(error => {
            response.error(req, res, 'Internal Error', 500, error);
        });
}


function insert(req, res) {
    controller.addTask(req.body)
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
    controller.updateTask(id, data)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal Error', 500, err);
        });
}

function remove(req, res) {
    const id = req.params.id;
    controller.removeTask(id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal Error', 500, err);
        });
}


function insertSubTask(req, res) {
    const { idTask } = req.params;
    const data = req.body;
    controller.insertSubTask(idTask, data)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal Error', 500, err);
        });
}


function deleteSubTask(req, res) {
    const { idTask, idSubtask } = req.params;
    controller.removeSubtask(idTask, idSubtask)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal Error', 500, err);
        });
}

function updateSubTask(req, res) {
    const { idTask, idSubtask } = req.params;
    const data = req.body;
    controller.updateSubTask(idTask, idSubtask, data)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal Error', 500, err);
        });
}



module.exports = router;