import express from 'express';
import { publicRouter } from './public';
import { privateRouter } from './private';
import authMiddleware from '../../middlewares/Auth.middleware';

const router = express.Router();

router.use('/', authMiddleware.publicAuth, publicRouter);
router.use('/', authMiddleware.privateAuth, privateRouter);

export { router as v1Router };
