import { Request, Response, NextFunction } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';
import { auth } from '../../../config/firebase';
import { UnauthorizedException, ForbiddenException } from '../../../errors/error';

export interface AuthenticatedRequest extends Request {
  user?: DecodedIdToken;
}

export const authenticateFirebaseToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedException('Authorization token was not provided', { authHeader }));
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    return next();
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return next(new ForbiddenException('Invalid or expired token', { token }));
  }
};