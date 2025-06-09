import express from "express";
import { isValidID } from "../middlewares/isValidID.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { uploadImage } from "../middlewares/upload.js";
import { projectSchema, updateProjectSchema } from "../validation/projects.js";
import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  getProjectsController,
  replaceProjectController,
  updateProjectController,
  uploadImageController,
} from "../controllers/projects.js";
import { auth } from "../middlewares/users.js";

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

// завантаження картинки разом з проєктом
projectRouters.post(
  "/",
  // auth,
  // upload.single("images"),
  // uploadImage.single("image"),
  jsonParser,
  validateBody(projectSchema),
  ctrlWrapper(createProjectController)
);

projectRouters.patch(
  "/:id/upload/image",
  uploadImage.single("image"),
  uploadImageController
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
