import express from 'express';
import { handleProxyRequest } from '../controllers/proxyController.js';

const router = express.Router();

router.get('/:lang', handleProxyRequest);

export default router;
