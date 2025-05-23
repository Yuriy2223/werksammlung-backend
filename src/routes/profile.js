import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { getProfile } from "../controllers/profile.js";

export const profileRouters = express.Router();

profileRouters.get("/", ctrlWrapper(getProfile));
