import express from "express";
import { isValidID } from "../middlewares/isValidID.js";
import { projectSchema, updateProjectSchema } from "../validation/projects.js";
import {
  createProjecController,
  deleteProjectController,
  getProjectController,
  getProjectsController,
  replaceProjectController,
  updateProjectController,
} from "../controllers/projects.js";

export const projectRouters = express.Router();
const jsonParser = express.json();

projectRouters.get("/", ctrlWrapper(getProjectsController));

projectRouters.get("/:id", isValidID, ctrlWrapper(getProjectController));

projectRouters.delete("/:id", isValidID, ctrlWrapper(deleteProjectController));

projectRouters.post(
  "/",
  upload.single("avatar"),
  jsonParser,
  validateBody(projectSchema),
  ctrlWrapper(createProjecController)
);

projectRouters.put(
  "/:id",
  isValidID,
  jsonParser,
  validateBody(projectSchema),
  ctrlWrapper(replaceProjectController)
);

projectRouters.patch(
  "/:id",
  isValidID,
  jsonParser,
  validateBody(updateProjectSchema),
  ctrlWrapper(updateProjectController)
);
