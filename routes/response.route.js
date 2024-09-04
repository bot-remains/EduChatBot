import express from 'express';
import { chatResponse } from '../controllers/response.controller.js';
const router = express.Router();

router.post('/', chatResponse);

export default router;
