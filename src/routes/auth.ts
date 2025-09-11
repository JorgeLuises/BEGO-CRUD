import { Router } from "express";
import { registro, logIn } from "../controllers/authController.js";

const router: Router = Router();

//Endpoint de registro
router.post('/registro', registro);

//Endpoint de login
router.post('/login', logIn);

export default router;