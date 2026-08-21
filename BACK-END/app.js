const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors'); //middleware

// pour le token
const dotenv = require('dotenv').config();
// db
const db = require('./src/config/configdb');
const authRoutes = require('./src/router/authRoutes');//authRoutes
const dashRoutes = require('./src/router/dashRoutes');//dashboard routes

app.use(cors()); //pour communiquer react/nodejs et envoyer des req HTTP
app.use(express.json()) //transformer les données json en objets

app.use('/auth',authRoutes);
app.use('/dashboard',dashRoutes);

app.listen(port, () =>{
    console.log(`Le port ${port} a été connecté http://localhost:3000`);
})