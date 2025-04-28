import { Request, Response, NextFunction } from "express";
import { User } from "@/models/user.model";
import { DatabaseError, NotFoundError, ValidationError } from "@/errors/errors";

// Crear usuario
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.create(req.body);

    res.json(user);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      next(
        new ValidationError({
          message: error.message,
          field: Object.keys(error.errors)[0],
        })
      );
    } else {
      // Para cualquier error de MongoDB, usamos DatabaseError
      next(
        new DatabaseError("create", {
          message: error.message,
        })
      );
    }
  }
};

// Obtener todos los usuarios
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    next(new DatabaseError("find", { message: error.message }));
  }
};

// Obtener usuario por ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      next(new NotFoundError("Usuario"));
      return;
    }
    res.json(user);
  } catch (error: any) {
    next(new DatabaseError("findById", { message: error.message }));
  }
};

// Actualizar usuario
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      next(new NotFoundError("Usuario"));
      return;
    }

    res.json(user);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      next(
        new ValidationError({
          message: error.message,
          field: Object.keys(error.errors)[0],
        })
      );
    } else {
      next(new DatabaseError("update", { message: error.message }));
    }
  }
};

// Eliminar usuario
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "inactive" }, // Usamos "inactive" en lugar de "deleted"
      { new: true }
    );

    if (!user) {
      next(new NotFoundError("Usuario"));
      return;
    }

    res.json({ message: "Usuario desactivado exitosamente" });
  } catch (error: any) {
    next(new DatabaseError("delete", { message: error.message }));
  }
};
