const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const {mongoose} = require ('./database');
const cors = require('cors');
// Settings
app.set('port', process.env.PORT || 5000);
//app.set('port',5000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:5000'}));
// app.use(cors({origin: 'http://localhost:4200'}));
//Routes
app.use('/api/empleados',require('./routes/empleados.routes'));
app.use('/api/tareas',require('./routes/tareas.routes'));
// Static Files
console.log(path.join(__dirname,'public'));
app.use(express.static(path.join(__dirname,'public')))

//Starting the server
app.listen(app.get('port'),()=>{
	console.log("Server running on port "+app.get('port'));
});
app.listen(5001,'192.168.0.3');


