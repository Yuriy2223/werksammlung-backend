import { Profile } from "../models/profile.js";

export const getProfile = async (req, res) => {
  try {
    //   const user = await User.findOne();
    const profile = await Profile.findOne().populate("projects");

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
