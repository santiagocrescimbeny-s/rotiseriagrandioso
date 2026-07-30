import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './modules/auth/routes/routes';
import { errorHandler } from './modules/auth/middleware/errorMiddleware';

const app: Application = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/auth', authRoutes);

// Ruta de prueba (Healthcheck)
app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', message: 'API de la Rotisería corriendo perfectamente 🚀' });
});

app.use(errorHandler);

export default app;