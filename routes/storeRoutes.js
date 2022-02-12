//import express, { Router } from 'express';
const express = require('express');
//import {registerStore, login} from '../controller/StoreController.js';
const {registerStore, login}= require('../controller/StoreController.js');

const router = express.Router();

router.post(`/register-store`, registerStore);
router.post(`/login`, login);

module.exports =  router;