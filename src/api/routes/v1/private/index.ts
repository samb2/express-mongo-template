import express, { Router } from 'express';
import { userRouter } from './user.route';

const router: Router = express.Router();

router.use('/user', userRouter);

export { router as privateRouter };
