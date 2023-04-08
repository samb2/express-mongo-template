import express from 'express';
import authController from '../../../controllers/v1/Auth.controller';
import authValidator from '../../../validators/v1/Auth.validator';

const router = express.Router();
/*  /api/v1/auth  */
router.post('/register', authValidator.register(), authController.register);
router.post('/login', authValidator.login(), authController.login);
router.post('/forgotPassword', authValidator.forgotPassword(), authController.forgotPassword);
router.post('/resetPassword', authValidator.resetPassword(), authController.resetPassword);

export { router as authRouter };
