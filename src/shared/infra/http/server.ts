import createConnection from '../typeorm/index'
import "../../container";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import { AppError } from "../../errors/AppError";

const app = express();

createConnection()
app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3333, () => console.log("Server is running..."));
