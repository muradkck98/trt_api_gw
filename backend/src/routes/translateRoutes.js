import express from 'express';
import { getDigestContent } from '../controllers/translateController.js';

const router = express.Router();

router.get('/digest', getDigestContent);

export default router;
