import express from "express";
import { createStat, getStats, updateStat } from "../controllers/stats.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { authCookie } from "../middlewares/authCookie.js";

export const statRouters = express.Router();
const jsonParser = express.json();

statRouters.get("/", authCookie, ctrlWrapper(getStats));
statRouters.post("/", authCookie, jsonParser, ctrlWrapper(createStat));
statRouters.patch("/:id", authCookie, jsonParser, ctrlWrapper(updateStat));
