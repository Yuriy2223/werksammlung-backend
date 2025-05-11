import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { contactMeSchema } from "../validation/contacts.js";
import { contactController } from "../controllers/contacts.js";

export const contactRouters = express.Router();
const jsonParser = express.json();

contactRouters.post(
  "/me",
  jsonParser,
  validateBody(contactMeSchema),
  ctrlWrapper(contactController)
);
