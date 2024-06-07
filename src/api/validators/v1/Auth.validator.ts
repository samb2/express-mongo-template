import Validator from '../Validator';
import { body } from 'express-validator';

class AuthValidator extends Validator {
    register(): any[] {
        return [
            body('email').trim().escape().isEmail().withMessage('Please enter a valid email'),
            body('password')
                .trim()
                .escape()
                .isLength({ min: 6 })
                .withMessage('Password must be at least 6 characters long'),
            this.handleValidationResult,
        ];
    }

    login(): any[] {
        return [
            body('email').trim().escape().isEmail().withMessage('Please enter a valid email'),
            body('password')
                .trim()
                .escape()
                .isLength({ min: 6 })
                .withMessage('Password must be at least 6 characters long'),
            this.handleValidationResult,
        ];
    }

    forgotPassword(): any[] {
        return [
            body('email').trim().escape().isEmail().withMessage('Please enter a valid email'),
            this.handleValidationResult,
        ];
    }

    resetPassword(): any[] {
        return [
            body('token').isJWT().withMessage('token required'),
            body('password')
                .trim()
                .escape()
                .isLength({ min: 6 })
                .withMessage('Password must be at least 6 characters long'),
            this.handleValidationResult,
        ];
    }
}

export default new AuthValidator();
