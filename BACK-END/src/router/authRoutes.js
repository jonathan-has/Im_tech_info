const express = require('express');
const router = express.Router();
const authController= require('./../controller/authController');
// post
router.post('/Register',authController.register);
// router.post('/login',login);
module.exports =router