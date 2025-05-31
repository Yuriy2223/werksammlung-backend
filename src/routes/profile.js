import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { profileSchema } from "../validation/profile.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  createProfileController,
  deleteProfileController,
  getProfileController,
  updateProfileController,
} from "../controllers/profile.js";

export const profileRouters = express.Router();
const jsonParser = express.json();

profileRouters.get("/", ctrlWrapper(getProfileController));
profileRouters.post(
  "/",
  jsonParser,
  validateBody(profileSchema),
  ctrlWrapper(createProfileController)
);
profileRouters.patch(
  "/",
  validateBody(profileSchema),
  ctrlWrapper(updateProfileController)
);
profileRouters.delete("/", ctrlWrapper(deleteProfileController));
