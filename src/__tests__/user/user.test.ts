import userTestController from '../../test/user/UserTestController';
import { getReasonPhrase } from 'http-status-codes';
import authTestController from '../../test/auth/AuthTestController';
import { UserUpdateDto } from '../../api/dtos/user.dto';

let token;

describe('User', () => {
    beforeEach(async () => {
        // create user
        token = await authTestController.registerAndGetToken();
    });

    describe('Get /user (Get Profile)', () => {
        it('Should Get user profile', async () => {
            const response = await userTestController.getProfile(token);

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(200);
            expect(response.body.status).toEqual(200);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Get user profile with firstname and lastname', async () => {
            // Update user
            const updateBody: UserUpdateDto = {
                firstName: 'testFirstName',
                lastName: 'testLastName',
            };
            await userTestController.updateProfile(token, updateBody);

            const response = await userTestController.getProfile(token);

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(200);
            expect(response.body.status).toEqual(200);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
            expect(response.body.result).toHaveProperty('id');
            expect(response.body.result).toHaveProperty('firstName');
            expect(response.body.result).toHaveProperty('lastName');
            expect(response.body.result).toHaveProperty('email');
        });

        it('Should Fail Token jwt malformed', async () => {
            const response = await userTestController.getProfile();

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(401);
            expect(response.body.status).toEqual(401);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });
        it('Should Fail Token jwt malformed', async () => {
            const response = await userTestController.getProfile({});

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(401);
            expect(response.body.status).toEqual(401);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });
    });

    describe('Update /user (Update Profile)', () => {
        it('Should Update user profile', async () => {
            const updateBody: UserUpdateDto = {
                firstName: 'testFirstName',
                lastName: 'testLastName',
            };
            const response = await userTestController.updateProfile(token, updateBody);

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(200);
            expect(response.body.status).toEqual(200);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail First Name must be string', async () => {
            const updateBody = {
                firstName: 123,
                lastName: 'testLastName',
            };
            const response = await userTestController.updateProfile(token, updateBody);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail lang=fr First Name must be string', async () => {
            const updateBody = {
                firstName: 123,
                lastName: 'testLastName',
            };
            const response = await userTestController.updateProfile(token, updateBody, 'fr');

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail First Name must be at least 2 characters long and less than 25 characters', async () => {
            const updateBody: UserUpdateDto = {
                firstName: 't',
                lastName: 'testLastName',
            };
            const response = await userTestController.updateProfile(token, updateBody);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail lang=de First Name must be at least 2 characters long and less than 25 characters', async () => {
            const updateBody: UserUpdateDto = {
                firstName: 't',
                lastName: 'testLastName',
            };
            const response = await userTestController.updateProfile(token, updateBody, 'de');

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail Last Name must be string', async () => {
            const updateBody = {
                firstName: 'testFirstName',
                lastName: 123,
            };
            const response = await userTestController.updateProfile(token, updateBody);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail lanf=fr Last Name must be string', async () => {
            const updateBody = {
                firstName: 'testFirstName',
                lastName: 123,
            };
            const response = await userTestController.updateProfile(token, updateBody, 'fr');

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail last Name must be at least 2 charactes long and less than 25 characters', async () => {
            const updateBody: UserUpdateDto = {
                firstName: 'testFirstName',
                lastName: 't',
            };
            const response = await userTestController.updateProfile(token, updateBody);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail lang=de last Name must be at least 2 charactes long and less than 25 characters', async () => {
            const updateBody: UserUpdateDto = {
                firstName: 'testFirstName',
                lastName: 't',
            };
            const response = await userTestController.updateProfile(token, updateBody, 'de');

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail Token jwt malformed', async () => {
            const response = await userTestController.updateProfile(false, {});

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(401);
            expect(response.body.status).toEqual(401);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });
    });
});
