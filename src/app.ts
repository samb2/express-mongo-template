import express, { Express } from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import config from './config';

global.Config = config;

import helmet from 'helmet';
import bodyParser from 'body-parser';
import passport from 'passport';
import compression from 'compression';
import cors from 'cors';
import expressJSDocSwagger from 'express-jsdoc-swagger';

import { router } from './api/routes';
import { morganMiddleware } from './config/logger';
import rateLimit from 'express-rate-limit';

export default class App {
    public app: Express;
    private static instance: App;

    constructor() {
        this.app = express();
        this.setConfig();
        this.setRoutes();
    }

    public static getInstance(): App {
        if (!App.instance) {
            App.instance = new App();
        }
        return App.instance;
    }

    setConfig(): void {
        if (process.env.NODE_ENV !== 'test') {
            this.app.use(morganMiddleware);
        }
        // Passport
        import('./utils/passports/passport-jwt');
        // Apply the rate limiting middleware to all requests
        this.app.use(rateLimit(Config.rateLimit));
        this.app.use(cors(Config.cors));
        // Helmet Config
        this.app.use(helmet());
        // Input Post Values to req.body
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // Passport Initialize
        this.app.use(passport.initialize());
        // gzip compression
        this.app.use(compression());
        if (process.env.NODE_ENV !== 'production') {
            expressJSDocSwagger(this.app)(Config.swagger);
        }
    }

    setRoutes(): void {
        this.app.use(router);
    }
}
