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
            throw new BadRequestException('User not found in the database');
        }

        return user;
    }
}