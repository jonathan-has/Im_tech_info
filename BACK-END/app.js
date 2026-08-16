const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors'); //middleware

// db
const db = require('./src/config/configdb');
const userRoutes = require('./src/router/userRoutes');//userRoutes
const {register,login} = require('./src/router/authRoutes');//authRoutes

app.use(cors()); //pour communiquer react/nodejs et envoyer des req HTTP
app.use(express.json()) //transformer les données json en objets

app.use('/Register',register);
app.user('/Login',register);

app.listen(port, () =>{
    console.log(`Le port ${port} a été connecté http://localhost:3000`);
})