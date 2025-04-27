import { Router } from "express";

const router = Router();

//Rutas CRUD de usuarios
router.get("/", (req, res) => {
  res.json({ message: "Get all users" });
});

router.get("/:id", (req, res) => {
  res.json({ message: "Get user by id" });
});

router.post("/", (req, res) => {
  res.json({ message: "Create user" });
});

router.put("/:id", (req, res) => {
  res.json({ message: "Update user" });
});

router.delete("/:id", (req, res) => {
  res.json({ message: "Delete user" });
});

export default router;
