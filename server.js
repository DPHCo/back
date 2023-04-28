const express = require('express');
const cors = require('cors');
const server = express();
const db = require('./models/db/config');

//Middlewares
server.use( express.json() );
server.use( cors() );

//Routes
server.use('/usuario', require('./routes/usuario') );
server.use('/encuesta', require('./routes/encuesta'));

db();

server.listen(8080, () => {
	console.log('Server on port: 8080');
})