import { prisma } from '../../../config/prisma';
import { BadRequestException } from '../../../errors/error';

export class AuthService {
    async syncUserWithDatabase(firebaseUser: { uid: string; email?: string; name?: string }) {
        if (!firebaseUser.email) {
            throw new BadRequestException('Firebase user does not have a valid email');
        }

        let user = await prisma.users.findUnique({
            where: { email: firebaseUser.email }
        });

        if (!user) {
            const nameParts = (firebaseUser.name || 'User').split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(' ');

            user = await prisma.users.create({
                data: {
                    auth_uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firstName,
                    last_name: lastName || '',
                }
            });
        }

        return user;
    }
}