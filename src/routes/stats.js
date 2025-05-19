import express from "express";
import { createStat, getStats } from "../controllers/statsController.js";

export const statRouters = express.Router();

statRouters.post("/", createStat);
statRouters.get("/", getStats);
