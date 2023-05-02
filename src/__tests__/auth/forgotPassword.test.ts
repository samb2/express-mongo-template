import authTestController from '../../test/auth/AuthTestController';
import { getReasonPhrase } from 'http-status-codes';
import { user1 } from '../../test/constants/auth';

describe('Forgot Password', (): void => {
    beforeEach(async (): Promise<void> => {
        await authTestController.register(user1);
    });

    describe('POST /api/v1/forgotPassword (Forgot Password)', (): void => {
        it('Should Forgot Password a User', async (): Promise<void> => {
            const data = {
                email: user1.email,
            };
            const response = await authTestController.forgotPassword(data);

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(200);
            expect(response.body.status).toEqual(200);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Forgot Password a User (with trimmed email)', async (): Promise<void> => {
            const data = {
                email: `      ${user1.email}`,
            };
            const response = await authTestController.forgotPassword(data);

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(200);
            expect(response.body.status).toEqual(200);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail Forgot Password Please enter a valid email (email is empty)', async (): Promise<void> => {
            const data = {
                email: ' ',
            };
            const response = await authTestController.forgotPassword(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail lang=de Forgot Password Please enter a valid email (email is empty)', async (): Promise<void> => {
            const data = {
                email: ' ',
            };
            const response = await authTestController.forgotPassword(data, 'de');

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail Forgot Password Please enter a valid email (email not Validate)', async (): Promise<void> => {
            const data = {
                email: 'notValidEmail',
            };
            const response = await authTestController.forgotPassword(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail lang=fr Forgot Password Please enter a valid email (email not Validate)', async (): Promise<void> => {
            const data = {
                email: 'notValidEmail',
            };
            const response = await authTestController.forgotPassword(data, 'fr');

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });
    });
});
