import { Document, model, Schema } from 'mongoose';
import Repository from '../Repository';

export interface IResetPasswordDocument extends Document {
    email: string;
    token: string;
    use?: boolean;
}

class ResetPassword extends Repository<IResetPasswordDocument> {
    constructor() {
        super(resetPasswordModel);
    }

    async tokenUsed(token: string): Promise<any> {
        return this.findOneAndUpdate({ token }, { use: true });
    }
}

const resetPasswordTokenSchema = new Schema<IResetPasswordDocument>(
    {
        email: { type: String, require: true },
        token: { type: String, require: true },
        use: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        toJSON: {
            transform(doc: any, ret: any): void {
                ret.id = ret._id;
                delete ret._id;
            },
            versionKey: false, // __v : 0
        },
    },
);

resetPasswordTokenSchema.loadClass(ResetPassword);

const resetPasswordModel = model<IResetPasswordDocument>('ResetPassword', resetPasswordTokenSchema);

export default new ResetPassword();
