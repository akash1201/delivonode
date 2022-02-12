//import express, { Router } from 'express';
const express, { Router }= reuire('express');
//import {registerStore, login} from '../controller/StoreController.js';
const {registerStore, login}= reuire('../controller/StoreController.js');

const router = express.Router();

router.post(`/register-store`, registerStore);
router.post(`/login`, login);

export default router;