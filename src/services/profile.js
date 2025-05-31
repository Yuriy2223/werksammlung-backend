import mongoose from "mongoose";
import { Profile } from "../models/profile.js";

export const createProfile = async (profile) => {
  return Profile.create(profile);
};
export const getProfiles = async () => {
  return Profile.find();
};
export const getProfile = async (profileId) => {
  if (!mongoose.Types.ObjectId.isValid(profileId)) return null;
  return Profile.findById(profileId);
};
export const getProfileByEmail = async (email) => {
  return Profile.findOne({ email });
};
export const updateProfile = async (profileId, profileData) => {
  if (!mongoose.Types.ObjectId.isValid(profileId)) return null;
  return Profile.findByIdAndUpdate(profileId, profileData, { new: true });
};
export const deleteProfile = async (profileId) => {
  if (!mongoose.Types.ObjectId.isValid(profileId)) return null;
  return Profile.findByIdAndDelete(profileId);
};
export const replaceProfile = async (profileId, profileData) => {
  if (!mongoose.Types.ObjectId.isValid(profileId)) return null;

  const result = await Profile.findByIdAndUpdate(profileId, profileData, {
    new: true,
    upsert: true,
  });

  return {
    value: result,
    updatedExisting: !!result,
  };
};
