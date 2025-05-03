import express from "express";
import multer from "multer";
import { upload } from "../middlewares/upload.js";
import { User } from "../models/user.js";

export const uploadRouters = express.Router();

uploadRouters.post(
  "/avatar/:userId",
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const sanitizedUserId = userId.trim();
      if (!req.file) {
        return res.status(400).json({ message: "Файл не надано" });
      }

      const updatedUser = await User.findByIdAndUpdate(
        sanitizedUserId,
        {
          avatar: {
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

      //       res
      //         .status(200)
      //         .json({ message: "Аватар успішно завантажено", user: updatedUser });
      //     } catch (err) {
      //       if (err instanceof multer.MulterError) {
      //         return res.status(400).json({ message: err.message });
      //       }

      //       next(err);
      //     }
      //   }
      // );
      res.status(200).json({
        message: "Аватар успішно завантажено",
        user: {
          ...updatedUser.toObject(),
          avatarUrl: `/api/avatar/${updatedUser._id}`,
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

uploadRouters.get("/avatar/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user || !user.avatar || !user.avatar.data) {
      return res.status(404).json({ message: "Аватар не знайдено" });
    }

    res.set("Content-Type", user.avatar.contentType);
    res.send(user.avatar.data);
  } catch (err) {
    next(err);
  }
});
