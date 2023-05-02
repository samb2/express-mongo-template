import express, { Router } from 'express';
import userController from '../../../controllers/v1/User.controller';
import userValidator from '../../../validators/v1/User.validator';

const router: Router = express.Router();

/*  /api/v1/user  */
router.get('/', userController.getProfile);
router.patch('/', userValidator.updateProfile(), userController.updateProfile);

export { router as userRouter };
