import express, { Router } from 'express';
import { authRouter } from './auth.route';

const router: Router = express.Router();

router.use('/auth', authRouter);

export { router as publicRouter };
