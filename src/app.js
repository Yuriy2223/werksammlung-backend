// import path from "node:path";
import express from "express";
import cookieParser from "cookie-parser";
import { routers } from "./routes/index.js";
import { notFoundError } from "./middlewares/notFoundError.js";
import { errorServer } from "./middlewares/errorServer.js";

export const app = express();

// app.use("/uploads", express.static(path.resolve("src", "uploads")));
app.use(cookieParser());
app.use(routers);
app.use(notFoundError);
app.use(errorServer);
