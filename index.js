const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
///Importando do Routes
const authRoute = require('./routes/auth');
const apiRoute = require('./routes/api');

dotenv.config();

//Conectar ao Banco de Dados
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true },() => 
    console.log('Conectado ao Banco de Dados!')
);

//Middleware
app.use(cors());
app.use(express.json());
///Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/article', apiRoute);


app.listen(3000, ()=>console.log('Servidor Ativo! Está funcionando! '));

