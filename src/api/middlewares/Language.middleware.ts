import Middleware from './Middleware';
import { NextFunction, Request, Response } from 'express';
import i18n from 'i18n';

class LanguageMiddleware extends Middleware {
    handle(req: Request, res: Response, next: NextFunction): void {
        const defaultLang: string = i18n.getLocale();
        // Get the Accept-Language header from the request
        const lang: string = req.headers[Config.language.queryParameter]?.toString() || defaultLang;
        i18n.setLocale(lang);
        next();
    }
}

export default new LanguageMiddleware();
