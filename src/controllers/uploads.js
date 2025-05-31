export const uploadAvatarController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file provided" });
  }

  req.profile.avatarUrl = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
    filename: req.file.originalname,
  };

  await req.profile.save();

  res.status(200).json({
    message: "Avatar uploaded successfully",
    user: {
      ...req.profile.toObject(),
      avatarUrl: `/api/uploads/avatar/${req.profile._id}`,
    },
  });
};

export const getAvatarController = async (req, res) => {
  const { avatarUrl } = req.profile;

  if (!avatarUrl || !avatarUrl.data) {
    return res.status(404).json({ message: "Avatar not found" });
  }

  res.set("Content-Type", avatarUrl.contentType);
  res.send(avatarUrl.data);
};

export const uploadCVController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No PDF file provided" });
  }

  req.profile.viewCV = {
    data: req.file.buffer,
    contentType: req.file.mimetype,
    filename: req.file.originalname,
  };

  await req.profile.save();

  res.status(200).json({
    message: "CV uploaded successfully",
    user: req.profile.toJSON(),
  });
};

export const getCVController = async (req, res) => {
  const { viewCV } = req.profile;

  if (!viewCV?.data) {
    return res.status(404).json({ message: "CV not found" });
  }

  res.set("Content-Type", viewCV.contentType);
  res.set("Content-Disposition", `inline; filename="${viewCV.filename}"`);
  res.send(viewCV.data);
};

/***************************************************** */
// import { Profile } from "../models/profile.js";

// export const uploadAvatarController = async (req, res, next) => {
//   const { profileId } = req.params;
//   const sanitizedProfileId = profileId.trim();

//   if (!req.file) {
//     return res.status(400).json({ message: "Файл не надано" });
//   }

//   const updatedProfile = await Profile.findByIdAndUpdate(
//     sanitizedProfileId,
//     {
//       avatarUrl: {
//         data: req.file.buffer,
//         contentType: req.file.mimetype,
//         filename: req.file.originalname,
//       },
//     },
//     { new: true }
//   );

//   if (!updatedProfile) {
//     return res.status(404).json({ message: "Користувача не знайдено" });
//   }

//   res.status(200).json({
//     message: "Аватар успішно завантажено",
//     user: {
//       ...updatedProfile.toObject(),
//       avatarUrl: `/api/uploads/avatar/${updatedProfile._id}`,
//     },
//   });
// };

// export const getAvatarController = async (req, res, next) => {
//   const { profileId } = req.params;
//   const profile = await Profile.findById(profileId.trim());

//   if (!profile || !profile.avatarUrl || !profile.avatarUrl.data) {
//     return res.status(404).json({ message: "Аватар не знайдено" });
//   }

//   res.set("Content-Type", profile.avatarUrl.contentType);
//   res.send(profile.avatarUrl.data);
// };

// export const uploadCVController = async (req, res, next) => {
//   const { profileId } = req.params;

//   if (!req.file) {
//     return res.status(400).json({ message: "PDF-файл не надано" });
//   }

//   const updatedProfile = await Profile.findByIdAndUpdate(
//     profileId.trim(),
//     {
//       viewCV: {
//         data: req.file.buffer,
//         contentType: req.file.mimetype,
//         filename: req.file.originalname,
//       },
//     },
//     { new: true }
//   );

//   if (!updatedProfile) {
//     return res.status(404).json({ message: "Користувача не знайдено" });
//   }

//   res.status(200).json({
//     message: "CV успішно завантажено",
//     user: updatedProfile.toJSON(),
//   });
// };

// export const getCVController = async (req, res, next) => {
//   const { profileId } = req.params;
//   const profile = await Profile.findById(profileId.trim());

//   if (!profile || !profile.viewCV?.data) {
//     return res.status(404).json({ message: "CV не знайдено" });
//   }

//   res.set("Content-Type", profile.viewCV.contentType);
//   res.set(
//     "Content-Disposition",
//     `inline; filename="${profile.viewCV.filename}"`
//   );
//   res.send(profile.viewCV.data);
// };
