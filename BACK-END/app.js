const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors'); //middleware

// pour le token
const dotenv = require('dotenv').config();

// db
const db = require('./src/config/configdb');

// routes
const authRoutes = require('./src/router/authRoutes');//authRoutes
const dashRoutes = require('./src/router/dashRoutes');//dashboard routes

// middlewares
app.use(cors()); //pour communiquer react avec nodejs et envoyer des req HTTP
app.use(express.json()) //transformer les données json en objets

// pour le stockage des fichiers
const upload = require('./src/middlewares/filemiddleware');
// Rendre les donnees accessible
app.use('/file',express.static('public/file'));

// routes
app.use('/auth',authRoutes);
app.use('/dashboard',dashRoutes);

app.listen(port, () =>{
    console.log(`Le port ${port} a été connecté http://localhost:3000`);
})