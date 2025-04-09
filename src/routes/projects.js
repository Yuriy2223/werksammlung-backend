import express from "express";
import { isValidID } from "../middlewares/isValidID.js";
import { validateBody } from "../middlewares/validateBody.js";
import { upload } from "../middlewares/upload.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { projectSchema, updateProjectSchema } from "../validation/projects.js";
import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  getProjectsController,
  replaceProjectController,
  updateProjectController,
} from "../controllers/projects.js";
// import { auth } from "../middlewares/users.js";

export const projectRouters = express.Router();
const jsonParser = express.json();

projectRouters.get("/", ctrlWrapper(getProjectsController));

projectRouters.get("/:id", isValidID, ctrlWrapper(getProjectController));

projectRouters.delete(
  "/:id",
  // auth,
  isValidID,
  ctrlWrapper(deleteProjectController)
);

projectRouters.post(
  "/",
  // auth,
  upload.single("images"),
  jsonParser,
  validateBody(projectSchema),
  ctrlWrapper(createProjectController)
);

projectRouters.put(
  "/:id",
  // auth,
  isValidID,
  jsonParser,
  validateBody(projectSchema),
  ctrlWrapper(replaceProjectController)
);

projectRouters.patch(
  "/:id",
  // auth,
  isValidID,
  jsonParser,
  validateBody(updateProjectSchema),
  ctrlWrapper(updateProjectController)
);
