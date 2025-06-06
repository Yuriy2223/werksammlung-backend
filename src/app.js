import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { routers } from "./routes/index.js";
import { notFoundError } from "./middlewares/notFoundError.js";
import { errorServer } from "./middlewares/errorServer.js";

export const app = express();

app.use(
  cors({
    // origin: process.env.CLIENT_URL,
    origin: [
      process.env.CLIENT_URL,
      process.env.CLIENT_URL2,
      process.env.CLIENT_URL3,
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api", routers);
app.use(notFoundError);
app.use(errorServer);
