import express from "express";
import { uploadAvatar, uploadCV } from "../middlewares/upload.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { isValidProfileID } from "../middlewares/isValidProfileID.js";
import { authCookie } from "../middlewares/authCookie.js";
import {
  getAvatarController,
  getCVController,
  uploadAvatarController,
  uploadCVController,
} from "../controllers/uploads.js";

export const uploadRouter = express.Router();

uploadRouter.post(
  "/avatar/:profileId",
  authCookie,
  isValidProfileID,
  uploadAvatar.single("avatar"),
  ctrlWrapper(uploadAvatarController)
);

uploadRouter.get(
  "/avatar/:profileId",
  isValidProfileID,
  ctrlWrapper(getAvatarController)
);

uploadRouter.post(
  "/cv/:profileId",
  authCookie,
  isValidProfileID,
  uploadCV.single("cv"),
  ctrlWrapper(uploadCVController)
);

uploadRouter.get(
  "/cv/:profileId",
  isValidProfileID,
  ctrlWrapper(getCVController)
);
