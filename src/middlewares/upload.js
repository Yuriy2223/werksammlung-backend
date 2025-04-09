// import path from "node:path";
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Недопустимий формат файлу. Дозволені: jpg, jpeg, png, webp"));
  }
};

export const upload = multer({ storage, fileFilter });
