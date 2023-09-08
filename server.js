const express = require('express');
const config = require('./config')
const router = require('./network/routes');
const db = require('./db/index');
// Manejo de errores
const errors = require('./network/errors');
const app = express();
const server = require('http').Server(app);
const PORT = config.api.PORT;
const DB_URL = config.db.URL;
// Indicamos el uso de json
app.use(express.json());
// Levantamos db
db(DB_URL);
// Levantamos rutas
router(app);
// Indicamos que vamos a manejar errores con un middleware
app.use(errors);
// Levatamos server
server.listen(PORT, () => {
    console.log('Servidor corriendo en localhost:', PORT);
});