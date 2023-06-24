import Service from '../Service';
import { UserProfileResDto, UserUpdateDto, UserUpdateResDto } from '../../api/dtos/user.dto';
import User from '../../database/model/user';
import { Types } from 'mongoose';

interface IUserService {
    getProfile(userId: Types.ObjectId): Promise<UserProfileResDto>;

    updateProfile(userId: Types.ObjectId, body: UserUpdateDto): Promise<UserUpdateResDto>;
}

class UserService extends Service implements IUserService {
    async getProfile(userId: any): Promise<UserProfileResDto> {
        const result = await User.findById(userId, { lean: true });
        return {
            firstName: result.firstName,
            lastName: result.lastName,
            id: result._id,
            email: result.email,
        };
    }

    async updateProfile(userId: any, body: UserUpdateDto): Promise<UserUpdateResDto> {
        const { firstName, lastName } = body;
        const result = await User.findByIdAndUpdate(userId, { firstName, lastName });
        return {
            firstName,
            lastName,
            id: result.id,
            email: result.email,
        };
    }
}

export default new UserService();
