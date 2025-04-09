import express from "express";
import cookieParser from "cookie-parser";
import { routers } from "./routes/index.js";
import { notFoundError } from "./middlewares/notFoundError.js";
import { errorServer } from "./middlewares/errorServer.js";

export const app = express();

app.use(cookieParser());
app.use("/api", routers);
app.use(notFoundError);
app.use(errorServer);
