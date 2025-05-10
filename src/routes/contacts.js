import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { contactMeSchema } from "../validation/contacts.js";

export const contactRouter = express.Router();
const jsonParser = express.json();

userRouters.post(
  "/me",
  jsonParser,
  validateBody(contactMeSchema),
  ctrlWrapper(contactController)
);
