import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import { obtenerUbicaciones, crearUbicacion, actualizarUbicacion, eliminarUbicacion } from '../controllers/locationController.js';

const router: Router = Router();

// Endpoint para mostrar las ubicaciones
router.get('/obternerUbicaciones', verifyToken, obtenerUbicaciones);

//Endpoint para crear una nueva ubicación
router.post('/crearUbicacion', verifyToken, crearUbicacion);

//Endpoint para actualizar una ubicación
router.put('/actuailizarUbicacion/:id', verifyToken, actualizarUbicacion);

//Endpoint para borrar una ubicación
router.delete('/eliminarUbicacion/:id', verifyToken, eliminarUbicacion);

export default router;