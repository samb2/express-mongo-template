import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { database } from '../config/database.config';
import { applySpeedGooseCacheLayer } from 'speedgoose';

let mongodb;

beforeAll(async (): Promise<void> => {
    // This will create a new instance of "MongoMemoryServer" and automatically start it
    mongodb = await MongoMemoryServer.create();
    const mongoUri = mongodb.getUri();
    mongoose.set('strictQuery', database.strictQuery);
    await mongoose.connect(mongoUri);
    await applySpeedGooseCacheLayer(mongoose, {
        redisUri: 'redis://127.0.0.1:6379',
    });
});

beforeEach(async (): Promise<void> => {
    await mongoose.connection.dropDatabase();
});

afterAll(async (): Promise<void> => {
    await mongodb.stop();
    await mongoose.connection.close();
});
