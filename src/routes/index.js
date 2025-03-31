import express from "express";
import { userRouters } from "./users.js";
import { projectRouters } from "./projects.js";

export const routers = express.Router();

routers.use("/users", userRouters);
routers.use("/projects", projectRouters);
