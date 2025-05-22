import express from "express";
import { createStat, getStats, updateStat } from "../controllers/stats.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

export const statRouters = express.Router();

const jsonParser = express.json();

statRouters.get("/", ctrlWrapper(getStats));
statRouters.post("/", jsonParser, ctrlWrapper(createStat));
statRouters.patch("/:id", jsonParser, ctrlWrapper(updateStat));
