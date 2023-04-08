import Middleware from './Middleware';
import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { UnauthorizedError } from 'irolegroup';

class AuthMiddleware extends Middleware {
    publicAuth(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', { session: false }, (err, user) => {
            if (err || !user) return next();
            req.user = user;
            next();
        })(req, res, next);
    }

    privateAuth(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (user) {
                req.user = user;
                return next();
            }
            if (!user) throw new UnauthorizedError(info.message);
        })(req, res, next);
    }
}

export default new AuthMiddleware();
