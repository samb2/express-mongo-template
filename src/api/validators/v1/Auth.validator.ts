import Validator from '../Validator';
import t from '../../../utils/translate';
import { body } from 'express-validator';

class AuthValidator extends Validator {
    register(): any[] {
        return [
            body('email')
                .trim()
                .escape()
                .isEmail()
                .withMessage(() => t('Please enter a valid email', __filename)),
            body('password')
                .trim()
                .escape()
                .isLength({ min: 6 })
                .withMessage(() => t('Password must be at least 6 characters long', __filename)),
            this.handleValidationResult,
        ];
    }

    login(): any[] {
        return [
            body('email')
                .trim()
                .escape()
                .isEmail()
                .withMessage(() => t('Please enter a valid email', __filename)),
            body('password')
                .trim()
                .escape()
                .isLength({ min: 6 })
                .withMessage(() => t('Password must be at least 6 characters long', __filename)),
            this.handleValidationResult,
        ];
    }

    forgotPassword(): any[] {
        return [
            body('email')
                .trim()
                .escape()
                .isEmail()
                .withMessage(() => t('Please enter a valid email', __filename)),
            this.handleValidationResult,
        ];
    }

    resetPassword(): any[] {
        return [
            body('token')
                .isJWT()
                .withMessage(() => t('token required', __filename)),
            body('password')
                .trim()
                .escape()
                .isLength({ min: 6 })
                .withMessage(() => t('Password must be at least 6 characters long', __filename)),
            this.handleValidationResult,
        ];
    }
}

export default new AuthValidator();
