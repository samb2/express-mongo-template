import User from '../../database/model/user';
import { user1, user2, user3, user4, user5 } from '../../test/constants/auth';
import userTestController from '../../test/user/UserTestController';

describe('Repository', () => {
    beforeEach(async () => {
        // create users
        await userTestController.createUsers([
            { email: user1.email, password: user1.password },
            { email: user2.email, password: user2.password },
            { email: user3.email, password: user3.password },
            { email: user4.email, password: user4.password },
        ]);
    });

    describe('find(where, option, cache)', () => {
        it('Should find()', async () => {
            const response = await User.find({});

            expect(response.length).toEqual(4);
        });

        it('Should find() with where', async () => {
            const response = await User.find({ email: 'testUser1@test.com' });

            expect(response.length).toEqual(1);
        });

        it('Should find() with select', async () => {
            const response = await User.find({}, { select: 'email password' });

            expect(response.length).toEqual(4);
            expect(response[0]).toHaveProperty('email');
            expect(response[0]).toHaveProperty('password');
            expect(response[0].createdAt).toBeUndefined();
        });

        it('Should find() with sort', async () => {
            const response = await User.find({}, { sort: { createdAt: 1 } });

            expect(response.length).toEqual(4);
        });

        it('Should find() with limit', async () => {
            const response = await User.find({}, { limit: 2 });

            expect(response.length).toEqual(2);
        });

        it('Should find() with skip', async () => {
            const response = await User.find({}, { skip: 2 });

            expect(response.length).toEqual(2);
            expect(response[0].email).toEqual(user3.email);
        });

        it('Should find() with lean', async () => {
            const response = await User.find({}, { lean: true });

            expect(response.length).toEqual(4);
        });

        it('Should find() with cache', async () => {
            const response = await User.find({}, {}, {});

            expect(response.length).toEqual(4);
        });
    });

    describe('findOne(where, option, cache)', () => {
        it('Should findOne()', async () => {
            const response = await User.findOne({ email: user4.email });

            expect(response.email).toEqual(user4.email);
        });

        it('Should findOne() with select', async () => {
            const response = await User.findOne({ email: user4.email }, { select: 'email password' });

            expect(response).toHaveProperty('email');
            expect(response).toHaveProperty('password');
            expect(response.email).toEqual(user4.email);
            expect(response.createdAt).toBeUndefined();
        });

        it('Should findOne() with lean', async () => {
            const response = await User.findOne({ email: user4.email }, { lean: true });

            expect(response).toBeTruthy();
            expect(response.email).toEqual(user4.email);
        });

        it('Should findOne() with cache', async () => {
            const response = await User.findOne({ email: user4.email }, {}, {});

            expect(response).toBeTruthy();
            expect(response.email).toEqual(user4.email);
        });
    });

    describe('findById(where, option, cache)', () => {
        it('Should findById()', async () => {
            const userId = await User.findOne({ email: user1.email });
            const response = await User.findById(userId._id);

            expect(response.email).toEqual(user1.email);
        });

        it('Should findById() with select', async () => {
            const userId = await User.findOne({ email: user1.email });
            const response = await User.findById(userId._id, { select: 'email' });

            expect(response.email).toEqual(user1.email);
            expect(response.password).toBeUndefined();
        });

        it('Should findById() with lean', async () => {
            const userId = await User.findOne({ email: user1.email });
            const response = await User.findById(userId._id, { lean: true });

            expect(response.email).toEqual(user1.email);
        });

        it('Should findById() with cache', async () => {
            const userId = await User.findOne({ email: user1.email });
            const response = await User.findById(userId._id, {}, {});

            expect(response.email).toEqual(user1.email);
        });
    });

    describe('paginate(where, option, cache)', () => {
        it('Should paginate()', async () => {
            const response = await User.paginate({}, { page: 1, limit: 2 });

            expect(response.results).toHaveLength(2);
            expect(response.count).toEqual(4);
            expect(response.totalPages).toEqual(2);
            expect(response.page).toEqual(1);
            expect(response.limit).toEqual(2);
        });

        it('Should paginate() with select', async () => {
            const response = await User.paginate({}, { page: 1, limit: 2, select: 'email' });

            expect(response.results).toHaveLength(2);
            expect(response.count).toEqual(4);
            expect(response.totalPages).toEqual(2);
            expect(response.page).toEqual(1);
            expect(response.limit).toEqual(2);
        });

        it('Should paginate() with sort', async () => {
            const response = await User.paginate({}, { page: 1, limit: 2, sort: { createdAt: 1 } });

            expect(response.results).toHaveLength(2);
            expect(response.count).toEqual(4);
            expect(response.totalPages).toEqual(2);
            expect(response.page).toEqual(1);
            expect(response.limit).toEqual(2);
        });

        it('Should paginate() with lean', async () => {
            const response = await User.paginate({}, { page: 1, limit: 2, lean: true });

            expect(response.results).toHaveLength(2);
            expect(response.count).toEqual(4);
            expect(response.totalPages).toEqual(2);
            expect(response.page).toEqual(1);
            expect(response.limit).toEqual(2);
        });

        it('Should paginate() with cache', async () => {
            const response = await User.paginate({}, { page: 1, limit: 2, lean: true }, {});

            expect(response.results).toHaveLength(2);
            expect(response.count).toEqual(4);
            expect(response.totalPages).toEqual(2);
            expect(response.page).toEqual(1);
            expect(response.limit).toEqual(2);
        });
    });

    describe('update(where , update)', () => {
        it('Should update()', async () => {
            const response = await User.update({ email: user1.email }, { email: 'update@test.com' });

            expect(response.acknowledged).toEqual(true);
        });
    });

    describe('findOneAndUpdate(where , update)', () => {
        it('Should findOneAndUpdate()', async () => {
            const response = await User.findOneAndUpdate({ email: user1.email }, { email: 'update@test.com' });

            expect(response.email).toEqual(user1.email);
        });
    });

    describe('findByIdAndUpdate(id , update)', () => {
        it('Should findByIdAndUpdate()', async () => {
            const userId = await User.findOne({ email: user1.email });
            const response = await User.findByIdAndUpdate(userId._id, { email: 'update@test.com' });

            expect(response.email).toEqual(user1.email);
        });
    });

    describe('updateMany(where , update)', () => {
        it('Should updateMany()', async () => {
            const response = await User.updateMany({ password: user4.password }, { password: '12345678' });

            expect(response.acknowledged).toEqual(true);
            expect(response.modifiedCount).toEqual(4);
        });
    });

    describe('deleteMany(where)', () => {
        it('Should deleteMany()', async () => {
            const response = await User.deleteMany({ password: user4.password });

            expect(response.acknowledged).toEqual(true);
            expect(response.deletedCount).toEqual(4);
        });
    });

    describe('findByIdAndDelete(id)', () => {
        it('Should findByIdAndDelete()', async () => {
            const userId = await User.findOne({ email: user1.email });
            const response = await User.findByIdAndDelete(userId);

            expect(response.email).toEqual(userId.email);
        });
    });

    describe('findOneAndDelete(where)', () => {
        it('Should findOneAndDelete()', async () => {
            const response = await User.findOneAndDelete({ email: user1.email });

            expect(response.email).toEqual(user1.email);
        });
    });

    describe('insert(value)', () => {
        it('Should insert()', async () => {
            const response = await User.insert({ email: user5.email, password: user5.password });

            expect(response.email).toEqual(user5.email);
        });
    });

    describe('insertWithoutSave(value)', () => {
        it('Should insertWithoutSave()', async () => {
            const response = await User.insertWithoutSave({ email: user5.email, password: user5.password });

            expect(response.email).toEqual(user5.email);
        });
    });
});
