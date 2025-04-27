import dotenv from "dotenv";
import { createExpressApp } from "./config/express";

//Cargar variables de entorno
dotenv.config();

//Crear la aplicación Express
const app = createExpressApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
