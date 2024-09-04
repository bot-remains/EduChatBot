import express from 'express';
import { instantiseVectorStore } from '../controllers/instantise.controller.js';
const router = express.Router();

router.post('/', instantiseVectorStore);

export default router;
