import { Router } from "express";
import userRoutes from "./userRoutes";
const router = Router();

//Rutas de usuarios
router.use("/users", userRoutes);

export default router;
