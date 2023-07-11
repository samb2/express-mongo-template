import authTestController from '../../test/auth/AuthTestController';
import { getReasonPhrase } from 'http-status-codes';
import { user1, resetPasswordInf } from '../../test/constants/auth';
import ResetPassword from '../../database/model/resetPassword';

let token;

describe('reset Password', (): void => {
    beforeEach(async (): Promise<void> => {
        await authTestController.register(user1);
        await authTestController.forgotPassword({ email: user1.email });
        const resetPassword = await ResetPassword.findOne({ email: user1.email });
        token = resetPassword.token;
    });

    describe('POST /api/v1/resetPassword (reset Password)', (): void => {
        it('Should reset Password a User', async (): Promise<void> => {
            const data = {
                token,
                password: resetPasswordInf.password,
            };
            const response = await authTestController.resetPassword(data);

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(200);
            expect(response.body.status).toEqual(200);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should reset Password a User (with trimmed password)', async (): Promise<void> => {
            const data = {
                token,
                password: `   ${resetPasswordInf.password}`,
            };
            const response = await authTestController.resetPassword(data);

            expect(response.body.success).toEqual(true);
            expect(response.status).toEqual(200);
            expect(response.body.status).toEqual(200);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail reset Password Please enter a valid token (token is empty)', async (): Promise<void> => {
            const data = {
                password: `${resetPasswordInf.password}`,
            };
            const response = await authTestController.resetPassword(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail reset Password Please enter a valid token (token is invalid)', async (): Promise<void> => {
            const data = {
                token: 'testToken',
                password: ` ${resetPasswordInf.password}`,
            };
            const response = await authTestController.resetPassword(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail reset Password Please enter a valid password (password is empty)', async (): Promise<void> => {
            const data = {
                token,
            };
            const response = await authTestController.resetPassword(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail reset Password Please enter a valid password (password is invalid)', async (): Promise<void> => {
            const data = {
                token,
                password: `test`,
            };
            const response = await authTestController.resetPassword(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(400);
            expect(response.body.status).toEqual(400);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.errors).toBeTruthy();
        });

        it('Should Fail reset Password This Token Expired', async (): Promise<void> => {
            const data = {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RVc2VyQHRlc3QuY29tIiwiaWF0IjoxNjc4ODg5NTIwLCJleHAiOjE2Nzg4OTA0MjB9.uh4aoHJGmyJNellmVz-chfCij-GcAA-IjwDfbdHXAJs',
                password: resetPasswordInf.password,
            };
            const response = await authTestController.resetPassword(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(500);
            expect(response.body.status).toEqual(500);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });

        it('Should Fail reset Password This Token Expired ( use token for reset password )', async (): Promise<void> => {
            const data = {
                token,
                password: resetPasswordInf.password,
            };
            await authTestController.resetPassword(data);
            const response = await authTestController.resetPassword(data);

            expect(response.body.success).toEqual(false);
            expect(response.status).toEqual(403);
            expect(response.body.status).toEqual(403);
            expect(response.body.label).toEqual(getReasonPhrase(response.body.status));
            expect(response.body.result).toBeTruthy();
        });
    });
});
