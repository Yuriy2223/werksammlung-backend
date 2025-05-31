import express from "express";
import { isValidID } from "../middlewares/isValidID.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { skillSchema, updateSkillSchema } from "../validation/skills.js";
import { authCookie } from "../middlewares/authCookie.js";
import {
  createSkillController,
  deleteSkillController,
  getSkillController,
  getSkillsController,
  updateSkillController,
} from "../controllers/skills.js";

export const skillRouters = express.Router();
const jsonParser = express.json();

skillRouters.get("/", ctrlWrapper(getSkillsController));
skillRouters.get("/:id", isValidID, ctrlWrapper(getSkillController));
skillRouters.delete(
  "/:id",
  authCookie,
  isValidID,
  ctrlWrapper(deleteSkillController)
);

skillRouters.post(
  "/",
  authCookie,
  jsonParser,
  validateBody(skillSchema),
  ctrlWrapper(createSkillController)
);

skillRouters.patch(
  "/:id",
  authCookie,
  isValidID,
  jsonParser,
  validateBody(updateSkillSchema),
  ctrlWrapper(updateSkillController)
);
