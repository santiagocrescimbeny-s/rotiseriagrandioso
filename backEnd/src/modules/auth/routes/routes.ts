import { Router } from 'express';
import { syncUser } from '../controller/firebaseController';
import { authenticateFirebaseToken } from '../middleware/middleware';

const router = Router();

// Endpoint protegido por el middleware de Firebase
router.post('/sync', authenticateFirebaseToken, syncUser);

export default router;