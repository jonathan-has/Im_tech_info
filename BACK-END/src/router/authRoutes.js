const express = require('express');
const router = express.Router();
const authController= require('./../controller/authController');
// post
router.post('/Register',authController.register);
router.post('/Login',authController.login)
module.exports =router