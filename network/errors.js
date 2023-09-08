const response = require('./response');
// Este middleware se encargara de gestionar todos los errores
function errors(error, req, res, next) {
    console.error('[error]', error);
    const message = error.message || 'Error Interno';
    const status = error.statusCode || 500;
    response.error(req, res, message, status);
}

module.exports = errors;