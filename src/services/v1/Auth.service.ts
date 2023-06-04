import Service from '../Service';
import jwt from 'jsonwebtoken';
import User, { IUserDocument } from '../../database/model/user';
import { bcryptPassword, comparePassword } from '../../utils/password';
import t from '../../utils/translate';
import {
    ResetPasswordDto,
    ForgotPasswordDto,
    LoginDto,
    RegisterDto,
    RegisterResDto,
    LoginResDto,
} from '../../api/dtos/auth.dto';
import { Types } from 'mongoose';
import ResetPassword, { IResetPasswordDocument } from '../../database/model/resetPassword';
import Email from '../../utils/email';
import { ConflictError, ForbiddenError, UnauthorizedError } from 'irolegroup/dist/errors';

interface IAuthService {
    registerProcess(body: RegisterDto): Promise<RegisterResDto>;

    loginProcess(body: LoginDto): Promise<LoginResDto>;

    forgotPasswordProcess(email: string): Promise<string>;

    resetPasswordProcess(body: ResetPasswordDto): Promise<string>;

    generateToken(userId: Types.ObjectId, type: string): string;
}

class AuthService extends Service implements IAuthService {
    async registerProcess(body: RegisterDto): Promise<RegisterResDto> {
        const { email, password } = body;

        const userExist: boolean = await User.checkUserExistWithEmail(email);
        if (userExist) throw new ConflictError(t('This Email Registered Before', __filename));
        const user: IUserDocument = await User.insert({ email, password: bcryptPassword(password) });
        const token: string = this.generateToken(user.id, 'TOKEN');
        return { token };
    }

    async loginProcess(body: LoginDto): Promise<LoginResDto> {
        const { email, password } = body;
        const user: IUserDocument = await User.findOne({ email });
        if (!user) throw new UnauthorizedError(t('username or password is wrong!', __filename));
        const checkPassword: boolean = comparePassword(password, user.password);
        if (!checkPassword) throw new UnauthorizedError(t('username or password is wrong!', __filename));
        const token: string = this.generateToken(user.id, 'TOKEN');
        const refreshToken: string = this.generateToken(user.id, 'REFRESH_TOKEN');
        return {
            token,
            refreshToken,
        };
    }

    async forgotPasswordProcess(email: string): Promise<string> {
        const userExist: boolean = await User.checkUserExistWithEmail(email);
        if (userExist) {
            const resetPasswordObject: Partial<IResetPasswordDocument> = {
                email,
                token: jwt.sign({ email }, Config.jwt.email_key, { expiresIn: '15m' }),
            };
            const { token } = await ResetPassword.insert(resetPasswordObject);
            if (process.env.NODE_ENV !== 'test') {
                // reset password link send to email
                const from: string = 'irolegroup@gmail.com';
                const to: string = email;
                const subject: string = 'reset password test';
                const text: string = `your token is ${token}`;

                await Email.sendMail(from, to, subject, text);
            }
        }
        return t('Email Send Successfully', __filename);
    }

    async resetPasswordProcess(body: ResetPasswordDto): Promise<string> {
        const { token, password } = body;
        // Check Token
        const checkVerify: any = jwt.verify(token, Config.jwt.email_key);
        const resetPassword = await ResetPassword.findOne({ token });
        if (!resetPassword || resetPassword.use || checkVerify.email !== resetPassword.email) {
            throw new ForbiddenError(t('This Token Expired', __filename));
        }
        // Update User Password & set reset Password as used
        await User.findOneAndUpdate({ email: resetPassword.email }, { password: bcryptPassword(password) });
        await ResetPassword.tokenUsed(token);

        return t('Your password Changed Successfully', __filename);
    }

    generateToken(userId: Types.ObjectId, type: string = 'TOKEN'): string {
        let expiresIn: string;
        if (type === 'TOKEN') {
            expiresIn = '1h';
            return jwt.sign({ id: userId }, Config.jwt.secret_key, { expiresIn });
        } else {
            expiresIn = '10d';
            return jwt.sign({ id: userId }, Config.jwt.refresh_key, { expiresIn });
        }
    }
}

export default new AuthService();
