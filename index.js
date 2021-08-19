const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser');

const app = express();

// Conexión a la base de datos
const db = require('./mysql');

// Modelos
require('./models/Cotizacion');

db.sync()
	.then(() => console.log('Connection has been established.'))
	.catch(error => console.log('Connection has not been established:', error));

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use('/api', router());

app.listen(3000, () => {
	console.log('Servidor corriendo en el puerto 3000');
})
