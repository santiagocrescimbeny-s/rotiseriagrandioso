import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from './firebase-service-account.json';

// Inicializamos la app con la clave de servicio
const app = initializeApp({
  credential: cert(serviceAccount as any)
});

// Exportamos el servicio de autenticación
export const auth = getAuth(app);