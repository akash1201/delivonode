//import express from 'express';
const expess= require('express');
import {
register,
login
} from "../controller/userController.js"

const router = express.Router()

router.post('/register', register);
router.post('/login', login);

export default router;