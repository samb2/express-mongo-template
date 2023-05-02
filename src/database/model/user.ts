import { Document, model, Schema } from 'mongoose';
import Repository from '../Repository';
import { SpeedGooseCacheAutoCleaner } from 'speedgoose';

export interface IUserDocument extends Document {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    isActive?: boolean;
    isDelete?: boolean;
    superAdmin?: boolean;
    admin?: boolean;
}

class User extends Repository<IUserDocument> {
    constructor() {
        super(UserModel);
    }

    async checkUserExistWithEmail(email: string): Promise<boolean> {
        const result = await this.findOne({ email });
        return !!result;
    }
}

const userSchema = new Schema<IUserDocument>(
    {
        firstName: { type: String, required: false },
        lastName: { type: String, required: false },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        isDelete: { type: Boolean, default: false },
        superAdmin: { type: Boolean, default: false },
        admin: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc: any, ret: any): void {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
            },
            versionKey: false, // __v : 0
        },
    },
);
userSchema.plugin(SpeedGooseCacheAutoCleaner);
userSchema.loadClass(User);

const UserModel = model<IUserDocument>('User', userSchema);

export { UserModel };

export default new User();
