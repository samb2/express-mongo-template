import Validator from '../Validator';
import { body } from 'express-validator';
import t from '../../../utils/translate';

class UserValidator extends Validator {
    updateProfile(): any {
        return [
            body('firstName')
                .isString()
                .trim()
                .escape()
                .withMessage(() => t('First Name must be string', __filename))
                .bail()
                .isLength({
                    min: 2,
                    max: 25,
                })
                .withMessage(() =>
                    t('First Name must be at least 2 characters long and less than 25 characters', __filename),
                ),
            body('lastName')
                .isString()
                .trim()
                .escape()
                .withMessage(() => t('Last Name must be string', __filename))
                .bail()
                .isLength({
                    min: 2,
                    max: 25,
                })
                .withMessage(() =>
                    t('last Name must be at least 2 characters long and less than 25 characters', __filename),
                ),
            this.handleValidationResult,
        ];
    }
}

export default new UserValidator();
