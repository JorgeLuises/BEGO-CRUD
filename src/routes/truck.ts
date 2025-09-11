import { Router } from "express";
import { crearTruck, obtenerTrucks, actualizarTruck, borrarTruck } from "../controllers/truckController.js";
import verificarToken from "../middlewares/verifyToken.js";

const router: Router = Router();

//Endpoint para crear un nuevo truck
router.post('/crearTruck', verificarToken, crearTruck);

//Endpoint para actualizar un truck
router.put('/actualizarTruck/:id', verificarToken, actualizarTruck);

//Endpoint para borrar un truck
router.delete('/eliminarTruck/:id', verificarToken, borrarTruck);

//Endpoint para enlistar los trucks
router.get('/obtenerTrucks', verificarToken, obtenerTrucks);

export default router;