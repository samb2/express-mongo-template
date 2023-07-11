import { TestController } from '../TestController';
import { user1 } from '../constants/auth';

class AuthTestController extends TestController {
    async register(data: any = user1): Promise<any> {
        return this.createRequest('post', '/auth/register', { data });
    }

    async registerAndGetToken(data: any = user1): Promise<any> {
        const register = await this.register(data);
        return register.body.result.token;
    }

    async login(data: any = user1): Promise<any> {
        return this.createRequest('post', '/auth/login', { data });
    }

    async forgotPassword(data: any): Promise<any> {
        return this.createRequest('post', '/auth/forgotPassword', { data });
    }

    async resetPassword(data: any): Promise<any> {
        return this.createRequest('post', '/auth/resetPassword', { data });
    }
}

export default new AuthTestController();
