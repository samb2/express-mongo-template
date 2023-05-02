import mongoose from 'mongoose';
import User from './model/user';
import ResetPassword from './model/resetPassword';

// ----- Change DataBase Url with your env -----
const migrate_url: string = 'mongodb://localhost:27017/iRole-Express-mongodb-dev';
// ---------------------------------------------
const getModels = async (): Promise<any> => {
    mongoose.set('strictQuery', false);
    // Ensure connection is open so we can run migrations
    if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(migrate_url);
    }

    // Return models that will be used in migration methods
    return {
        User,
        ResetPassword,
    };
};

export default getModels;
