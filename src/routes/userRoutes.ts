import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "@/controllers/user.controller";
import { Router } from "express";

const router = Router();

//Rutas CRUD de usuarios
router.post("/", createUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
