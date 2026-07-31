import { Request, Response, NextFunction } from 'express';
import { UserService } from '../userService';

const userService = new UserService();

export class UserController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, name, last_name, phone } = req.body;

            if (!email || !password || !name || !last_name) {
                return res.status(400).json({
                    message: 'Faltan campos obligatorios (email, password, name, last_name)'
                });
            }

            const user = await userService.registerUser({
                email,
                password,
                name,
                last_name,
                phone,
            });

            res.status(201).json({
                message: 'Usuario registrado exitosamente',
                user,
            });
        } catch (error) {
            next(error);
        }
    }
}