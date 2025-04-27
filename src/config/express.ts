import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "@/middlewares/errorHandler";
import routes from "@/routes";
import { responseMiddleware } from "@/middlewares/response.middleware";

export const createExpressApp = () => {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));

  // Formateador de Respuestas
  app.use(responseMiddleware);

  //Rutas
  app.use("/api", routes);
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      errorHandler(err, req, res, next);
    }
  );

  return app;
};
