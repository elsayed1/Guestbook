import express from "express";
import { NOT_FOUND } from "./common/http-status.js";
import { errorHandler } from "./common/middlewares.js";
import appRouter from "./router.js";

const app = express();

//app.use(express.json());
app.use("/api", appRouter);
app.use(errorHandler);

app.use((req, res) => {
  res
    .status(NOT_FOUND)
    .json({ message: `Cannot ${req.method} ${req.originalUrl}` });
});

export default app;
