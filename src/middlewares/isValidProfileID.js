import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";
import { Profile } from "../models/profile.js";

export const isValidProfileID = async (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(new createHttpError.BadRequest("Invalid profile ID format"));
  }

  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      return next(new createHttpError.NotFound("Profile not found"));
    }

    req.profile = profile;
    next();
  } catch (error) {
    next(new createHttpError.InternalServerError("Database error"));
  }
};
