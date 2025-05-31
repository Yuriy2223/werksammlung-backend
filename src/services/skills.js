import mongoose from "mongoose";
import { Skill } from "../models/skill.js";

export const getSkills = async () => {
  return Skill.find();
};

export const getSkill = async (skillId) => {
  if (!mongoose.Types.ObjectId.isValid(skillId)) return null;
  return Skill.findById(skillId);
};

export const createSkill = async (skillData) => {
  return Skill.create(skillData);
};

export const updateSkill = async (skillId, updatedData) => {
  if (!mongoose.Types.ObjectId.isValid(skillId)) return null;
  return Skill.findByIdAndUpdate(skillId, updatedData, { new: true });
};

export const deleteSkill = async (skillId) => {
  if (!mongoose.Types.ObjectId.isValid(skillId)) return null;
  return Skill.findByIdAndDelete(skillId);
};
