import authTestController from '../../test/auth/AuthTestController';
import { getReasonPhrase } from 'http-status-codes';
import { user1 } from '../../test/constants/auth';

describe('Login', (): void => {
    beforeEach(async (): Promise<void> => {
        await authTestController.register();
    });

    describe('POST /api/v1/login (Login)', (): void => {
        it('Should Login a User', async (): Promise<void> => {
            const response = await authTestController.login();

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(200);
            expect(response.body.status).toEqual(200);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result.token).toBeTruthy();
            expect(response.body.result.refreshToken).toBeTruthy();
        });

        it('Should Login a User (with trimmed email)', async (): Promise<void> => {
            const data = {
                email: `    ${user1.email}`,
                password: user1.password,
            };
            const response = await authTestController.login(data);

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(200);
            expect(response.body.status).toEqual(200);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result.token).toBeTruthy();
            expect(response.body.result.refreshToken).toBeTruthy();
        });

        it('Should Login a User (with trimmed password)', async (): Promise<void> => {
            const data = {
                email: user1.email,
                password: `     ${user1.password}`,
            };
            const response = await authTestController.login(data);

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(200);
            expect(response.body.status).toEqual(200);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result.token).toBeTruthy();
            expect(response.body.result.refreshToken).toBeTruthy();
        });

        it('Should Fail Login Please enter a valid email (email is empty)', async (): Promise<void> => {
            const data = {
                password: user1.password,
            };
            const response = await authTestController.login(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail lang=fr Login Please enter a valid email (email is empty)', async (): Promise<void> => {
            const data = {
                password: user1.password,
            };
            const response = await authTestController.login(data, 'fr');

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail Login Please enter a valid email (email not Validate)', async (): Promise<void> => {
            const data = {
                email: 'notvalidemail',
                password: user1.password,
            };
            const response = await authTestController.login(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail lang=de Login Please enter a valid email (email not Validate)', async (): Promise<void> => {
            const data = {
                email: 'notvalidemail',
                password: user1.password,
            };
            const response = await authTestController.login(data, 'de');

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail Login Password must be at least 6 characters long (password is empty)', async (): Promise<void> => {
            const data = {
                email: user1.email,
            };
            const response = await authTestController.login(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail lang=fr Login Password must be at least 6 characters long (password is empty)', async (): Promise<void> => {
            const data = {
                email: user1.email,
            };
            const response = await authTestController.login(data, 'fr');

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail Login Password must be at least 6 characters long (short password)', async (): Promise<void> => {
            const data = {
                email: user1.email,
                password: 'short',
            };
            const response = await authTestController.login(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail lang=de Login Password must be at least 6 characters long (short password)', async (): Promise<void> => {
            const data = {
                email: user1.email,
                password: 'short',
            };
            const response = await authTestController.login(data, 'de');

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail Login username or password is wrong! (password is wrong)', async (): Promise<void> => {
            const data = {
                email: user1.email,
                password: 'wrongPassword',
            };
            const response = await authTestController.login(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(401);
            expect(response.body.status).toEqual(401);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail lang=de Login username or password is wrong! (password is wrong)', async (): Promise<void> => {
            const data = {
                email: user1.email,
                password: 'wrongPassword',
            };
            const response = await authTestController.login(data, 'de');

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(401);
            expect(response.body.status).toEqual(401);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail Login username or password is wrong! (email is wrong)', async (): Promise<void> => {
            const data = {
                email: 'Wrongemail@email.com',
                password: user1.password,
            };
            const response = await authTestController.login(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(401);
            expect(response.body.status).toEqual(401);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail lang=fr Login username or password is wrong! (email is wrong)', async (): Promise<void> => {
            const data = {
                email: 'Wrongemail@email.com',
                password: user1.password,
            };
            const response = await authTestController.login(data, 'fr');

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(401);
            expect(response.body.status).toEqual(401);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });
    });
});
