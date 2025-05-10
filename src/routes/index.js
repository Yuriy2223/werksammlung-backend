import express from "express";
import { userRouters } from "./users.js";
import { projectRouters } from "./projects.js";
import { uploadRouter } from "./uploads.js";
import { contactRouter } from "./contacts.js";

export const routers = express.Router();

routers.use("/users", userRouters);
routers.use("/projects", projectRouters);
routers.use("/uploads", uploadRouter);
routers.use("/contacts", contactRouter);
