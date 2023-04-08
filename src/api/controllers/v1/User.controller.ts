import Controller from '../Controller';
import { NextFunction, Request, Response } from 'express';
import { UserProfileResDto, UserUpdateDto, UserUpdateResDto } from '../../dtos/user.dto';
import userService from '../../../services/v1/User.service';

interface IUserController {
    getProfile(req: Request, res: Response, next: NextFunction): Promise<any>;

    updateProfile(req: Request, res: Response, next: NextFunction): Promise<any>;
}

class UserController extends Controller implements IUserController {
    /**
     * GET /api/v1/user
     * @tags users
     * @security BearerAuth
     * @return {object} 200 - profile response
     * @example response - 200 - success profile response example
     * {
     *   "success": true,
     *   "status": 200,
     *   "label": "OK",
     *   "result": {
     *     "id": "64281318f51d3e3cf094549f",
     *     "email": "test@test.com"
     *   }
     * }
     */
    async getProfile(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.user?.id;
            const userProfileResDto: UserProfileResDto = await userService.getProfile(userId);
            return this.success(userProfileResDto, res);
        } catch (e: any) {
            next(e);
        }
    }

    /**
     * PATCH /api/v1/user
     * @tags users
     * @security BearerAuth
     * @param {UserUpdateDto} request.body.required - update profile body
     * @example request - login payload example
     * {
     *   "firstName": "test First",
     *   "lastName": "test Last"
     * }
     * @return {object} 200 - update profile response
     * @example response - 200 - success profile response example
     * {
     *   "success": true,
     *   "status": 200,
     *   "label": "OK",
     *   "result": {
     *     "firstName": "test First",
     *     "lastName": "test Last",
     *     "id": "64281318f51d3e3cf094549f",
     *     "email": "test@test.com"
     *   }
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
     *       "value": "",
     *       "msg": "First Name must be at least 2 characters long and less than 25 characters",
     *       "param": "firstName",
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
     *   "result": "No auth token"
     * }
     */
    async updateProfile(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const userId = req.user?.id;
            const userUpdateDto: UserUpdateDto = req.body;
            const userUpdateResDto: UserUpdateResDto = await userService.updateProfile(userId, userUpdateDto);
            this.success(userUpdateResDto, res);
        } catch (e: any) {
            next(e);
        }
    }
}

export default new UserController();
