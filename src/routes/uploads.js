import express from "express";
import multer from "multer";
import { uploadAvatar, uploadCV } from "../middlewares/upload.js";
import { Profile } from "../models/profile.js";

export const uploadRouter = express.Router();

uploadRouter.post(
  "/avatar/:userId",
  uploadAvatar.single("avatar"),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const sanitizedUserId = userId.trim();
      if (!req.file) {
        return res.status(400).json({ message: "Файл не надано" });
      }

      const updatedUser = await Profile.findByIdAndUpdate(
        sanitizedUserId,
        {
          avatarUrl: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            filename: req.file.originalname,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Користувача не знайдено" });
      }

      res.status(200).json({
        message: "Аватар успішно завантажено",
        user: {
          ...updatedUser.toObject(),
          avatarUrl: `/api/uploads/avatar/${updatedUser._id}`,
        },
      });
    } catch (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      }
      next(err);
    }
  }
);

uploadRouter.get("/avatar/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await Profile.findById(userId.trim());

    if (!user || !user.avatarUrl || !user.avatarUrl.data) {
      return res.status(404).json({ message: "Аватар не знайдено" });
    }

    res.set("Content-Type", user.avatarUrl.contentType);
    res.send(user.avatarUrl.data);
  } catch (err) {
    next(err);
  }
});

uploadRouter.post(
  "/cv/:userId",
  uploadCV.single("cv"),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      if (!req.file) {
        return res.status(400).json({ message: "PDF-файл не надано" });
      }

      const updatedUser = await Profile.findByIdAndUpdate(
        userId.trim(),
        {
          viewCV: {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            filename: req.file.originalname,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Користувача не знайдено" });
      }

      res.status(200).json({
        message: "CV успішно завантажено",
        user: updatedUser.toJSON(),
      });
    } catch (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
      }
      next(err);
    }
  }
);

uploadRouter.get("/cv/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await Profile.findById(userId.trim());

    if (!user || !user.viewCV?.data) {
      return res.status(404).json({ message: "CV не знайдено" });
    }

    res.set("Content-Type", user.viewCV.contentType);
    res.set(
      "Content-Disposition",
      `inline; filename="${user.viewCV.filename}"`
    );
    res.send(user.viewCV.data);
  } catch (err) {
    next(err);
  }
});
