const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

function sign(data) {
    // Firmamos el token connuestra palabra secreta
    return jwt.sign(data, secret);
}

function verify(token) {
    // Verificamos el token enviando nuestra palabra secreta
    return jwt.verify(token, secret);
}


const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);
        console.log(owner)
            // Comprobamos si es propio
        if (decoded.id !== owner) {
            // throw error('Accion no permitida', 401)
            throw new Error('Accion no permitida');
        }
    },
    logged: function(req) {
        const decoded = decodeHeader(req);


    }
}

function getToken(auth) {
    if (!auth) {
        throw new Error('No viene token');
    }
    // Validamos formato
    if (auth.indexOf('Bearer ') === -1) {
        throw new Error('Format Invalido');
    }
    // Limpiamos el token
    let token = auth.replace('Bearer ', '');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}


module.exports = {
    sign,
    check
};