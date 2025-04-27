import { Request, Response, NextFunction } from "express";
import { BaseResponse } from "../utils/response.util";

export const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Guardamos la función original de res.json
  const originalJson = res.json;

  // Sobrescribimos res.json para formatear todas las respuestas
  res.json = function (body: any) {
    // Creamos una nueva respuesta usando BaseResponse
    const response = new BaseResponse(body).build();

    // Llamamos a la función original con nuestra respuesta formateada
    return originalJson.call(this, response);
  };

  next();
};
