const Joi = require('joi');
const errors = require('../../utils/error');


function validator(schema, property) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data);
        if (error) {
            console.log(error);
            throw errors(error.details[0].message, 501);
        } else {
            next();
        }
    }
}

module.exports = {
    validator
}