import createHttpError from "http-errors";
import { User } from "../models/user.js";
import { Session } from "../models/session.js";

export const authCookie = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return next(createHttpError.Unauthorized("Please provide access token"));
  }

  const session = await Session.findOne({ accessToken });

  if (!session) {
    return next(createHttpError.Unauthorized("Session not found"));
  }

  if (session.accessTokenValidUntil < new Date()) {
    return next(createHttpError.Unauthorized("Access token is expired"));
  }

  const user = await User.findById(session.userId);

  if (!user) {
    return next(createHttpError.Unauthorized("User not found"));
  }

  req.user = { id: user._id, name: user.name };

  next();
};
