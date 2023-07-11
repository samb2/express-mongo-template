import Service from '../Service';
import jwt from 'jsonwebtoken';
import User, { IUserDocument } from '../../database/model/user';
import { bcryptPassword, comparePassword } from '../../utils/password';
import {
    ResetPasswordDto,
    LoginDto,
    RegisterDto,
    RegisterResDto,
    LoginResDto,
} from '../../api/dtos/auth.dto';
import ResetPassword, { IResetPasswordDocument } from '../../database/model/resetPassword';
import Email from '../../utils/email';
import { ConflictError, ForbiddenError, UnauthorizedError } from 'irolegroup/dist/errors';

interface IAuthService {
    registerProcess(body: RegisterDto): Promise<RegisterResDto>;

    loginProcess(body: LoginDto): Promise<LoginResDto>;

    forgotPasswordProcess(email: string): Promise<string>;

    resetPasswordProcess(body: ResetPasswordDto): Promise<string>;

    generateToken(data: string, type: string): string;
}

class AuthService extends Service implements IAuthService {
    async registerProcess(body: RegisterDto): Promise<RegisterResDto> {
        const { email, password } = body;

        const userExist: boolean = await User.checkUserExistWithEmail(email);
        if (userExist) throw new ConflictError('This Email Registered Before');
        const user: IUserDocument = await User.insert({ email, password: bcryptPassword(password) });
        const token: string = this.generateToken(user.id, 'TOKEN');
        return { token };
    }

    async loginProcess(body: LoginDto): Promise<LoginResDto> {
        const { email, password } = body;
        const user: IUserDocument = await User.findOne({ email });
        if (!user) throw new UnauthorizedError('username or password is wrong!');
        const checkPassword: boolean = comparePassword(password, user.password);
        if (!checkPassword) throw new UnauthorizedError('username or password is wrong!');
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
                token: this.generateToken(email, 'EMAIL_TOKEN'),
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
        return 'Email Send Successfully';
    }

    async resetPasswordProcess(body: ResetPasswordDto): Promise<string> {
        const { token, password } = body;
        // Check Token
        const checkVerify: any = jwt.verify(token, Config.jwt.email_key);
        const resetPassword = await ResetPassword.findOne({ token });
        if (!resetPassword || resetPassword.use || checkVerify.email !== resetPassword.email) {
            throw new ForbiddenError('This Token Expired');
        }
        // Update User Password & set reset Password as used
        await User.findOneAndUpdate({ email: resetPassword.email }, { password: bcryptPassword(password) });
        await ResetPassword.tokenUsed(token);

        return 'Your password Changed Successfully';
    }

    generateToken(data: string, type: string = 'TOKEN'): string {
        let expiresIn: string;
        if (type === 'TOKEN') {
            expiresIn = '1h';
            return jwt.sign({ id: data }, Config.jwt.secret_key, { expiresIn });
        } else if (type === 'EMAIL_TOKEN') {
            expiresIn = '15m';
            return jwt.sign({ email: data }, Config.jwt.email_key, { expiresIn });
        } else {
            expiresIn = '10d';
            return jwt.sign({ id: data }, Config.jwt.refresh_key, { expiresIn });
        }
    }
}

export default new AuthService();
