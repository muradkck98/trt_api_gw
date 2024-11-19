import express from 'express';
import { getUnifiedContent } from '../controllers/contentController.js';

const router = express.Router();

router.get('/', getUnifiedContent);

export default router;