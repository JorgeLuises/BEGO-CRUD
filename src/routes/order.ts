import { Router } from "express";
import { crearOrden, actualizarOrden, verOrdenes, eliminarOrden, actualizarStatusOrden } from "../controllers/orderController.js";
import verifyToken from "../middlewares/verifyToken.js";

const router: Router = Router();

//Endpoint para crear una nueva orden
router.post("/crearOrden", verifyToken, crearOrden);

//Endpoint para enlistar las ordenes
router.get("/verOrdenes", verifyToken, verOrdenes);

//Endpoint para actualizar una orden completa
router.put("/actualizarOrden/:id", verifyToken, actualizarOrden);

//Endpoint para actualizar el estatus de una orden
router.patch("/actualizarEstatus/:id", verifyToken, actualizarStatusOrden);

//Endpoint para eliminar una orden
router.delete("/eliminarOrden/:id", verifyToken, eliminarOrden);

export default router;