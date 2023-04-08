import { bcryptPassword, comparePassword } from '../../utils/password';

describe('Repository', () => {
    describe('bcryptPassword', () => {
        it('Should bcryptPassword()', async () => {
            const password = 'testPassword';
            const response = bcryptPassword(password);

            expect(response).toBeTruthy();
            expect(response).not.toBeUndefined();
        });

        it('Should comparePassword()', async () => {
            const password = 'testPassword';
            const bcryptedPassword = bcryptPassword(password);

            const response = comparePassword(password, bcryptedPassword);

            expect(response).toEqual(true);
        });

        it('Should fail comparePassword()', async () => {
            const password = 'testPassword';
            const wrongPassword = 'wrongPassword';
            const bcryptedPassword = bcryptPassword(password);

            const response = comparePassword(wrongPassword, bcryptedPassword);

            expect(response).toEqual(false);
        });
    });
});
