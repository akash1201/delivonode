import express, { Router } from 'express';
import {registerStore, login} from '../controller/StoreController.js';

const router = express.Router();

router.post(`/register-store`, registerStore);
router.post(`/login`, login);

export default router;