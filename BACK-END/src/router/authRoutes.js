const express = require('express');
const router = express.Router();
const {register,login} = require('./../controller/authController');
// post
router.post('/Register',register);
router.post('/login',login);