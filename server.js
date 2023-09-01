const express = require('express');
const config = require('./config')
const router = require('./network/routes');
const db = require('./db/index');

const app = express();
const server = require('http').Server(app);
const PORT = config.api.PORT;
const DB_URL = config.db.URL;

app.use(express.json());
// Levantamos db
db(DB_URL);
// Levantamos rutas
router(app);
// Levatamos server
server.listen(PORT, () => {
    console.log('Servidor corriendo en localhost:', PORT);
});