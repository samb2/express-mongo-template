import { TestController } from '../TestController';
import { Types } from 'mongoose';
import { user1 } from '../constants/auth';
import User from '../../database/model/user';
import { RegisterDto } from '../../api/dtos/auth.dto';

class UserTestController extends TestController {
    async createUser(user: RegisterDto = user1): Promise<any> {
        await User.insert({ email: user.email, password: user.password });
    }

    async createUserAndGetId(user: RegisterDto = user1): Promise<Types.ObjectId> {
        const createdUser = await User.insert({ email: user.email, password: user.password });
        return createdUser._id;
    }

    async createUsers(values: RegisterDto[]): Promise<any> {
        await User.insertMany(values);
    }

    async getProfile(token: any = false, lang: string = 'en'): Promise<any> {
        return this.createRequest('get', '/user', { token, lang });
    }

    async updateProfile(token: any = false, updateBody, lang: string = 'en'): Promise<any> {
        return this.createRequest('patch', '/user', { token, data: updateBody, lang });
    }
}

export default new UserTestController();
