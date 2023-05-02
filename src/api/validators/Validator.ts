import { validationResult } from 'express-validator';
import autoBind from 'auto-bind';
import { NextFunction, Request } from 'express';
import { ValidationError } from 'irolegroup';

export default class Validator {
    constructor() {
        autoBind(this);
    }

    handleValidationResult(req: Request, res: Response, next: NextFunction): void {
        const errors: any = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ValidationError(errors.array());
        }
        next();
    }
}
