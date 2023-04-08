import { IUserDocument } from '../database/model/user';
import { Types } from 'mongoose';

declare global {
    var Config: any;
    namespace Express {
        interface User extends IUserDocument {
            id: Types.ObjectId;
        }
    }
}
export {};
