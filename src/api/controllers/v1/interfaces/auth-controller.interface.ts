import { NextFunction, Request, Response } from 'express';

export interface AuthControllerInterface {
    register(req: Request, res: Response, next: NextFunction): Promise<void>;

    login(req: Request, res: Response, next: NextFunction): Promise<void>;

    forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void>;

    resetPassword(req: Request, res: Response, next: NextFunction): Promise<void>;
}
