// Import your models here
import getModels from '../migrate';
import { bcryptPassword } from '../../utils/password';

export async function up(): Promise<void> {
    // Write migration here
    const { User } = await getModels();
    await User.insert({
        email: 'superadmin@test.com',
        password: bcryptPassword('12345678'), // change this password
        superAdmin: true,
    });
}

export async function down(): Promise<void> {
    // Write migration here
    const { User } = await getModels();
    await User.findOneAndDelete({ email: 'superadmin@test.com' });
}
