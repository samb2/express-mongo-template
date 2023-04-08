import { RegisterDto } from '../../api/dtos/auth.dto';

const user1: RegisterDto = {
    email: 'testUser1@test.com',
    password: 'TestPassword',
};

const user2: RegisterDto = {
    email: 'testUser2@test.com',
    password: 'TestPassword',
};

const user3: RegisterDto = {
    email: 'testUser3@test.com',
    password: 'TestPassword',
};

const user4: RegisterDto = {
    email: 'testUser4@test.com',
    password: 'TestPassword',
};

const user5: RegisterDto = {
    email: 'testUser5@test.com',
    password: 'TestPassword',
};

const resetPasswordInf = {
    password: 'NewPassword',
};

export { user1, user2, user3, user4, user5, resetPasswordInf };
