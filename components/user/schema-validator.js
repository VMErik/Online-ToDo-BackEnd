const Joi = require('joi');

const newUserSchema = Joi.object({
    name: Joi.string().required().min(5).max(40),
    username: Joi.string().required().min(3).max(20),
    password: Joi.string().required().min(3),
    email: Joi.string().email().required()
});

module.exports = {
    newUserSchema
}