import { bcryptPassword, comparePassword } from '../../utils/password';

describe('Repository', (): void => {
    describe('bcryptPassword', (): void => {
        it('Should bcryptPassword()', async (): Promise<void> => {
            const password: string = 'testPassword';
            const response: string = bcryptPassword(password);

            expect(response).toBeTruthy();
            expect(response).not.toBeUndefined();
        });

        it('Should comparePassword()', async (): Promise<void> => {
            const password: string = 'testPassword';
            const bcryptedPassword: string = bcryptPassword(password);

            const response: boolean = comparePassword(password, bcryptedPassword);

            expect(response).toEqual(true);
        });

        it('Should fail comparePassword()', async (): Promise<void> => {
            const password: string = 'testPassword';
            const wrongPassword: string = 'wrongPassword';
            const bcryptedPassword: string = bcryptPassword(password);

            const response: boolean = comparePassword(wrongPassword, bcryptedPassword);

            expect(response).toEqual(false);
        });
    });
});
