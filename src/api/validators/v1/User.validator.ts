import Validator from '../Validator';
import { body } from 'express-validator';

class UserValidator extends Validator {
    updateProfile(): any {
        return [
            body('firstName')
                .isString()
                .trim()
                .escape()
                .withMessage('First Name must be string')
                .bail()
                .isLength({
                    min: 2,
                    max: 25,
                })
                .withMessage('First Name must be at least 2 characters long and less than 25 characters'),
            body('lastName')
                .isString()
                .trim()
                .escape()
                .withMessage('Last Name must be string')
                .bail()
                .isLength({
                    min: 2,
                    max: 25,
                })
                .withMessage('last Name must be at least 2 characters long and less than 25 characters'),
            this.handleValidationResult,
        ];
    }
}

export default new UserValidator();
