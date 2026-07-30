import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/middleware';
import { AuthService } from '../service/authService';
import { UnauthorizedException } from '../../../errors/error';

const authService = new AuthService();

export const syncUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const firebaseUser = req.user;

        if (!firebaseUser) {
            throw new UnauthorizedException('User is not authenticated', { firebaseUser });
        }

        const user = await authService.syncUserWithDatabase({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.name,
        });

        return res.status(200).json({
            message: 'User authenticated and synchronized successfully',
            user
        });

    } catch (error) {
        next(error);
    }
};