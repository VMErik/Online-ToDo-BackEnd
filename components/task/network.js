const express = require('express')
const controller = require('./controller');
const response = require('../../network/response');
const secure = require('./secure');

const { TaskSchema } = require('./schema-validator');
const { validatorTask } = require('./validators');

const router = express.Router();

// Tasks
router.get('/', secure('list'), list);
router.get('/:id', secure('logged'), getId);
router.post('/', [secure('create'), validatorTask(TaskSchema, "body")], insert);
router.patch('/:id', [secure('logged')], update);
router.delete('/:id', secure('logged'), remove);

// Subtasks
router.post('/:idTask/Add/', insertSubTask);
router.patch('/:idTask/Update/:idSubtask', updateSubTask);
router.delete('/:idTask/Remove/:idSubtask', deleteSubTask);

function list(req, res, next) {

    const { user } = req.query;
    if (!user) {
        // No hay usuario, mostramos todas
        controller.listTasks()
            .then(data => {
                response.success(req, res, data, 200);
            })
            .catch(next);
    } else {
        // Filtramos solo por usuario
        controller.listTasksByUser(user)
            .then(data => {
                response.success(req, res, data, 200);
            })
            .catch(next);
    }

}


function getId(req, res, next) {
    const id = req.params.id;
    controller.listTask(id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);

}


function insert(req, res, next) {


    controller.addTask(req.body)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);

}


function update(req, res, next) {
    const id = req.params.id;
    const data = req.body;
    controller.updateTask(id, data)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);

}

function remove(req, res, next) {
    const id = req.params.id;
    controller.removeTask(id)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);

}


function insertSubTask(req, res, next) {
    const { idTask } = req.params;
    const data = req.body;
    controller.insertSubTask(idTask, data)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);

}


function deleteSubTask(req, res, next) {
    const { idTask, idSubtask } = req.params;
    controller.removeSubtask(idTask, idSubtask)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);

}

function updateSubTask(req, res, next) {
    const { idTask, idSubtask } = req.params;
    const data = req.body;
    controller.updateSubTask(idTask, idSubtask, data)
        .then(data => {
            response.success(req, res, data, 200);
        })
        .catch(next);

}



module.exports = router;