import { getAuth } from 'firebase-admin/auth';
import { prisma } from '../../config/prisma';
import { BadRequestException } from '../../errors/error';

interface CreateUserDTO {
    email: string;
    password: string;
    name: string;
    last_name: string;
    phone?: string;
}

export class UserService {
    async registerUser(data: CreateUserDTO) {
        const { email, password, name, last_name, phone } = data;

        const existingUser = await prisma.users.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new BadRequestException('El email ya se encuentra registrado');
        }

        let firebaseUser;
        try {
            firebaseUser = await getAuth().createUser({
                email,
                password,
                displayName: `${name} ${last_name}`,
            });
        } catch (error: any) {
            throw new BadRequestException(`Error en Firebase: ${error.message}`);
        }

        try {
            // 3. Crear el perfil completo en PostgreSQL
            const newUser = await prisma.users.create({
                data: {
                    auth_uid: firebaseUser.uid,
                    email,
                    name,
                    last_name,
                    phone: phone || null,
                    is_active: true,
                },
            });

            return newUser;
        } catch (error) {
            await getAuth().deleteUser(firebaseUser.uid);
            throw new BadRequestException('Error al crear el usuario en la base de datos, se eliminó el usuario de Firebase', error);
        }
    }
}