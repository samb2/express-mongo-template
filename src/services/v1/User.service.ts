import Service from '../Service';
import { UserProfileResDto, UserUpdateDto, UserUpdateResDto } from '../../api/dtos/user.dto';
import User from '../../database/model/user';

class UserService extends Service {
    async getProfile(userId): Promise<UserProfileResDto> {
        const result = await User.findById(userId, { lean: true });
        return {
            firstName: result.firstName,
            lastName: result.lastName,
            id: result._id,
            email: result.email,
        };
    }

    async updateProfile(userId, body: UserUpdateDto): Promise<UserUpdateResDto> {
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
