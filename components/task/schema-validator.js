const Joi = require('joi');


const SubTaskSchema = Joi.object({
    id: Joi.string(),
    completed: Joi.boolean(),
    subtask: Joi.string(),
});


const TaskSchema = Joi.object({
    user: Joi.string().required(), //
    title: Joi.string().required(),
    body: Joi.string(),
    status: Joi.string().valid('PENDIENTE', 'TERMINADO', 'ELIMINADO', 'PAPELERA'),
    list: Joi.array().items(SubTaskSchema),
});


module.exports = {
    TaskSchema
}