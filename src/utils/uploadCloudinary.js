import cloudinary from "cloudinary";

import { getEnvVar } from "./getEnvVar.js";

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar("CLOUDINARY_CLOUD_NAME"),
  api_key: getEnvVar("CLOUDINARY_API_KEY"),
  api_secret: getEnvVar("CLOUDINARY_API_SECRET"),
});

export const uploadCloudinary = (filePath) => {
  return cloudinary.v2.uploader.upload(filePath, {
    folder: "portfolio",
  });
};
