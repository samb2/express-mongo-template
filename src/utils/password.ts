import bcrypt from 'bcrypt';

export function bcryptPassword(password: string): string {
    // Bcrypt with 15 salt
    const salt: string = bcrypt.genSaltSync(15);
    // Bcrypt Password with Salt
    return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
}
