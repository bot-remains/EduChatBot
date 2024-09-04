import express from 'express';
import { instantiseVectorStore } from '../controllers/instantise.controller.js';
const router = express.Router();

router.get('/', instantiseVectorStore);

export default router;
