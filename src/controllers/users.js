import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
  requestResetPassword,
} from "../services/users.js";

export const registerController = async (req, res) => {
  const user = await registerUser(req.body);
  res
    .status(200)
    .json({ status: 200, message: "User successfully registered", data: user });
};

// export const loginController = async (req, res) => {
//   const session = await loginUser(req.body.email, req.body.password);

//   res.cookie("sessionId", session._id, {
//     httpOnly: true,
//     expires: session.refreshTokenValidUntil,
//   });

//   res.cookie("refreshToken", session.refreshToken, {
//     httpOnly: true,
//     expires: session.refreshTokenValidUntil,
//   });

//   res.status(200).json({
//     status: 200,
//     message: "User successfully logged",
//     data: {
//       accessToken: session.accessToken,
//     },
//   });
// };
// export const loginController = async (req, res) => {
//   const session = await loginUser(req.body.email, req.body.password);

//   res.cookie("sessionId", session._id, {
//     httpOnly: true,
//     expires: new Date(session.refreshTokenValidUntil),
//   });

//   res.cookie("refreshToken", session.refreshToken, {
//     httpOnly: true,
//     expires: new Date(session.refreshTokenValidUntil),
//   });

//   res.status(200).json({
//     status: 200,
//     message: "User successfully logged",
//     data: {
//       accessToken: session.accessToken,
//     },
//   });
// };
export const loginController = async (req, res) => {
  const session = await loginUser(req.body.email, req.body.password);

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.cookie("accessToken", session.accessToken, {
    httpOnly: true,
    expires: new Date(session.accessTokenValidUntil),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    status: 200,
    message: "User successfully logged",
    data: {
      accessToken: session.accessToken,
    },
  });
};

// export const logoutController = async (req, res) => {
//   const { sessionId, refreshToken } = req.cookies;

//   if (typeof sessionId === "string" && typeof refreshToken === "string") {
//     await logoutUser(sessionId, refreshToken);
//   }

//   res.clearCookie("sessionId");
//   res.clearCookie("refreshToken");
//   res.status(204).end();
// };

export const logoutController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  if (typeof sessionId === "string" && typeof refreshToken === "string") {
    await logoutUser(sessionId, refreshToken);
  }

  res.clearCookie("sessionId", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(204).end();
};

// export const refreshController = async (req, res) => {
//   const { sessionId, refreshToken } = req.cookies;

//   const session = await refreshSession(sessionId, refreshToken);

//   res.cookie("sessionId", session._id, {
//     httpOnly: true,
//     expire: session.refreshTokenValidUntil,
//   });

//   res.cookie("refreshToken", session.refreshToken, {
//     httpOnly: true,
//     expires: session.refreshTokenValidUntil,
//   });

//   res.status(200).json({
//     status: 200,
//     message: "User successfully logged",
//     data: {
//       accessToken: session.accessToken,
//     },
//   });
// };

// export const refreshController = async (req, res) => {
//   const { sessionId, refreshToken } = req.cookies;

//   const session = await refreshSession(sessionId, refreshToken);

//   res.cookie("sessionId", session._id, {
//     httpOnly: true,
//     expires: new Date(session.refreshTokenValidUntil),
//   });

//   res.cookie("refreshToken", session.refreshToken, {
//     httpOnly: true,
//     expires: new Date(session.refreshTokenValidUntil),
//   });

//   res.status(200).json({
//     status: 200,
//     message: "User successfully logged",
//     data: {
//       accessToken: session.accessToken,
//     },
//   });
// };
export const refreshController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);

  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.cookie("accessToken", session.accessToken, {
    httpOnly: true,
    expires: new Date(session.accessTokenValidUntil),
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    status: 200,
    message: "Session refreshed",
  });
};

export const requestPasswordResetController = async (req, res) => {
  const { email } = req.body;

  await requestResetPassword(email);

  res.json({ status: 200, message: "Reset password email sent successfully" });
};

export const resetPasswordController = async (req, res) => {
  const { token, password } = req.body;

  await resetPassword(token, password);

  res.send("Reset password");
};

export const currentUserController = async (req, res) => {
  res.json({
    status: 200,
    message: "Current user fetched successfully",
    data: req.user,
  });
};
