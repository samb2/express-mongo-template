import autoBind from 'auto-bind';
import { App } from '../app';
import request from 'supertest';

interface IRequestOption {
    token?: any;
    data?: any;
    query?: any;
    lang: string;
}

export class TestController {
    protected baseURL: string | undefined;
    public app: App | undefined;

    constructor() {
        autoBind(this);
        this.setApp(new App().app);
        this.setBaseURL('/api/v1');
    }

    async createRequest(method: string, path: string, options: IRequestOption = { lang: 'en' }) {
        const agent = request.agent(this.getApp());
        const req = agent[method](`${this.getBaseURL()}${path}`)
            .set('Accept', 'application/json')
            .set('accept-language', options.lang)
            .set('Authorization', `Bearer ${options.token}`);
        if (options.query) {
            req.query(options.query);
        }
        if (options.data) {
            req.send(options.data);
        }
        return await req;
    }

    getApp(): App {
        return <App>this.app;
    }

    setApp(value: App) {
        this.app = value;
    }

    getBaseURL(): string {
        return <string>this.baseURL;
    }

    setBaseURL(value: string) {
        this.baseURL = value;
    }
}
