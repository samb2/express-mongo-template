// import { TestController } from '../TestController';
// import { user1 } from '../constants/auth';
//
// class AuthTestController extends TestController {
//     async register(data: any = user1, lang: string = 'en'): Promise<any> {
//         return this.createRequest('post', '/auth/register', { data, lang });
//     }
//
//     async registerAndGetToken(data: any = user1, lang: string = 'en'): Promise<any> {
//         const register = await this.register(data, lang);
//         return register.body.result.token;
//     }
//
//     async login(data: any = user1, lang: string = 'en'): Promise<any> {
//         return this.createRequest('post', '/auth/login', { data, lang });
//     }
//
//     async forgotPassword(data: any, lang: string = 'en'): Promise<any> {
//         return this.createRequest('post', '/auth/forgotPassword', { data, lang });
//     }
//
//     async resetPassword(data: any, lang: string = 'en'): Promise<any> {
//         return this.createRequest('post', '/auth/resetPassword', { data, lang });
//     }
// }
//
// export default new AuthTestController();
