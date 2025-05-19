import express from "express";
import { userRouters } from "./users.js";
import { projectRouters } from "./projects.js";
import { uploadRouter } from "./uploads.js";
import { contactRouters } from "./contacts.js";
import { statRouters } from "./stats.js";

export const routers = express.Router();

routers.use("/users", userRouters);
routers.use("/projects", projectRouters);
routers.use("/uploads", uploadRouter);
routers.use("/contacts", contactRouters);
routers.use("/stats", statRouters);
