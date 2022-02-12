//import express from 'express';
const express= require('express');
// import {
// register,
// login
// } from "../controller/userController.js"
const {register, login} = require('../controller/userController')

const router = express.Router()

router.post('/register', register);
router.post('/login', login);

module.exports =  router;