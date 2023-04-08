import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import autoBind from 'auto-bind';

export default class Controller {
    constructor() {
        autoBind(this);
    }

    /**
     * success
     * @typedef {object} success
     * @property {boolean} success.required - The title
     * @property {number} status.required - The title
     * @property {string} label.required - The title
     * @property {object} result.required - The title
     */
    success(data: any, res: Response, statusCode: StatusCodes = StatusCodes.OK) {
        res.status(statusCode).json({
            success: true,
            status: statusCode,
            label: getReasonPhrase(statusCode),
            result: data,
        });
    }
}
