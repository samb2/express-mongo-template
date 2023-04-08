import { Request, Response, NextFunction } from 'express';
import Controller from '../Controller';
import authService from '../../../services/v1/Auth.service';
import { StatusCodes } from 'http-status-codes';
import {
    ForgotPasswordDto,
    LoginDto,
    LoginResDto,
    RegisterDto,
    RegisterResDto,
    ResetPasswordDto,
} from '../../dtos/auth.dto';

interface IAuthController {
    register(req: Request, res: Response, next: NextFunction): Promise<any>;

    login(req: Request, res: Response, next: NextFunction): Promise<any>;

    forgotPassword(req: Request, res: Response, next: NextFunction): Promise<any>;

    resetPassword(req: Request, res: Response, next: NextFunction): Promise<any>;
}

class AuthController extends Controller implements IAuthController {
    /**
     * POST /api/v1/auth/register
     * @tags auth
     * @param {RegisterDto} request.body.required - register body
     * @example request - register payload example
     * {
     *   "email": "test@test.com",
     *   "password": "12345678"
     * }
     * @return {object} 201 - register response
     * @example response - 201 - success register response example
     * {
     *  "success": true,
     *   "status": 201,
     *   "label": "Created",
     *   "result": {
     *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjVkNThhYTRiMTQ4NjQ4YmNlZjVmMSIsImlhdCI6MTY4MDIwMTA5OCwiZXhwIjoxNjgwMjA0Njk4fQ.9yqHgLAFXOaWpeLVu5D2q29YJh_2405ComhmZN3ahfw"
     *      }
     * }
     * @return {object} 400 - bad request
     * @example response - 400 - bad request response example
     * {
     *  "success": false,
     *   "status": 400,
     *   "label": "Bad Request",
     *   "result": "Validation error",
     *   "errors": [
     *     {
     *       "value": "test",
     *       "msg": "Please enter a valid email",
     *       "param": "email",
     *       "location": "body"
     *     }
     *   ]
     * }
     * @return {object} 409 - conflict
     * @example response - 409 - conflict response example
     * {
     *  "success": false,
     *   "status": 409,
     *   "label": "Conflict",
     *   "result": "This Email Registered Before"
     * }
     */
    async register(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const registerDto: RegisterDto = req.body;
            const registerRes: RegisterResDto = await authService.registerProcess(registerDto);
            this.success(registerRes, res, StatusCodes.CREATED);
        } catch (e: any) {
            next(e);
        }
    }

    /**
     * POST /api/v1/auth/login
     * @tags auth
     * @param {LoginDto} request.body.required - login body
     * @example request - login payload example
     * {
     *   "email": "test@test.com",
     *   "password": "12345678"
     * }
     * @return {object} 200 - login response
     * @example response - 200 - success login response example
     * {
     *  "success": true,
     *   "status": 200,
     *   "label": "OK",
     *   "result": {
     *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjVkNThhYTRiMTQ4NjQ4YmNlZjVmMSIsImlhdCI6MTY4MDIwMTA5OCwiZXhwIjoxNjgwMjA0Njk4fQ.9yqHgLAFXOaWpeLVu5D2q29YJh_2405ComhmZN3ahfw",
     *     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjVkNThhYTRiMTQ4NjQ4YmNlZjVmMSIsImlhdCI6MTY4MDM0NTAyMSwiZXhwIjoxNjgxMjA5MDIxfQ.TsdY0db18w7ZGxPs5CCgA12ZqvQwcoy-vhlCWq6fU6A"
     *      }
     * }
     * @return {object} 400 - bad request
     * @example response - 400 - bad request response example
     * {
     *  "success": false,
     *   "status": 400,
     *   "label": "Bad Request",
     *   "result": "Validation error",
     *   "errors": [
     *     {
     *       "value": "test",
     *       "msg": "Please enter a valid email",
     *       "param": "email",
     *       "location": "body"
     *     }
     *   ]
     * }
     * @return {object} 401 - Unauthorized
     * @example response - 401 - Unauthorized response example
     * {
     *  "success": false,
     *   "status": 401,
     *   "label": "Unauthorized",
     *   "result": "username or password is wrong!"
     * }
     */
    async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const loginDto: LoginDto = req.body;
            const loginRes: LoginResDto = await authService.loginProcess(loginDto);
            this.success(loginRes, res, StatusCodes.OK);
        } catch (e: any) {
            next(e);
        }
    }

    /**
     * POST /api/v1/auth/forgotPassword
     * @tags auth
     * @param {ForgotPasswordDto} request.body.required - forgotPassword body
     * @example request - forgotPassword payload example
     * {
     *   "email": "test@test.com"
     * }
     * @return {object} 200 - forgotPassword response
     * @example response - 200 - success forgotPassword response example
     * {
     *   "success": true,
     *   "status": 200,
     *   "label": "OK",
     *   "result": "Email Send Successfully"
     * }
     * @return {object} 400 - bad request
     * @example response - 400 - bad request response example
     * {
     *  "success": false,
     *   "status": 400,
     *   "label": "Bad Request",
     *   "result": "Validation error",
     *   "errors": [
     *     {
     *       "value": "test",
     *       "msg": "Please enter a valid email",
     *       "param": "email",
     *       "location": "body"
     *     }
     *   ]
     * }
     */
    async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const forgotPasswordDto: ForgotPasswordDto = req.body;
            const result: string = await authService.forgotPasswordProcess(forgotPasswordDto);
            this.success(result, res);
        } catch (e: any) {
            next(e);
        }
    }

    /**
     * POST /api/v1/auth/resetPassword
     * @tags auth
     * @param {ResetPasswordDto} request.body.required - resetPassword body
     * @example request - resetPassword payload example
     * {
     *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2ODAzNDcxMTQsImV4cCI6MTY4MDM0ODAxNH0.beN0HSJiE0VppyAH84pmGl4fv9z1hoBY72RtL9v_2yw",
     *   "password": "newPassword"
     * }
     * @return {object} 200 - resetPassword response
     * @example response - 200 - success resetPassword response example
     * {
     *   "success": true,
     *   "status": 200,
     *   "label": "OK",
     *   "result": "Your password Changed Successfully"
     * }
     * @return {object} 400 - bad request
     * @example response - 400 - bad request response example
     * {
     *   "success": false,
     *   "status": 400,
     *   "label": "Bad Request",
     *   "result": "Validation error",
     *   "errors": [
     *     {
     *       "value": "test@test.com",
     *       "msg": "token required",
     *       "param": "token",
     *       "location": "body"
     *     }
     *   ]
     * }
     * @return {object} 403 - Forbidden
     * @example response - 403 - Forbidden response example
     * {
     *   "success": false,
     *   "status": 403,
     *   "label": "Forbidden",
     *   "result": "This Token Expired"
     * }
     * @return {object} 500 - Internal Server Error
     * @example response - 500 - Internal Server Error response example
     * {
     *   "success": false,
     *   "status": 500,
     *   "label": "Internal Server Error",
     *   "result": "invalid signature"
     * }
     */
    async resetPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const resetPasswordDto: ResetPasswordDto = req.body;
            const result: string = await authService.resetPasswordProcess(resetPasswordDto);
            this.success(result, res);
        } catch (e: any) {
            next(e);
        }
    }
}

export default new AuthController();
