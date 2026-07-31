import { Router } from 'express';
import { UserController } from '../controller/userController';

const router = Router();
const userController = new UserController();

router.post('/register', (req, res, next) => userController.register(req, res, next));

export default router;