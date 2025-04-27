import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "@/middlewares/errorHandler";
import routes from "@/routes";

export const createExpressApp = () => {
  const app = express();

  // Middlewares
  app.use(express.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(errorHandler);

  //Rutas
  app.use("/api", routes);

  return app;
};
