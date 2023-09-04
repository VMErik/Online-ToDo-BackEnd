// Modulo para hacer uso de respuestas coherentes
// Con el fin de que nuestras respuestas tengan la misma estructura
exports.success = function(req, res, message, status) {

    let statusCode = status || 200;
    let statusMessage = message || '';

    // Definimos nuestra respuesta personalizada
    res.status(statusCode).send({
        error: '',
        status: statusCode,
        body: statusMessage
    });
}

// El parametro details, lo utilizamos para poder imprimir en los logs, detalles de los errores
exports.error = function(req, res, error, status, message) {
    let statusCode = status || 500
    let statusMessage = message || 'Internal Server Error';

    console.error(message);
    // Definimos nuestra respuesta personalizada
    res.status(statusCode).send({
        error: error,
        status: statusCode,
        body: ''
    });
}