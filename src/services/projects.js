import mongoose from "mongoose";
import { Project } from "../models/project.js";

export const getProjects = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const skip = (page - 1) * perPage;
  const queryFilter = {};

  if (filter.minYear) {
    queryFilter.createdAt = { ...queryFilter.createdAt, $gte: filter.minYear };
  }
  if (filter.maxYear) {
    queryFilter.createdAt = { ...queryFilter.createdAt, $lte: filter.maxYear };
  }

  const [total, projects] = await Promise.all([
    Project.countDocuments(queryFilter),
    Project.find(queryFilter)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip(skip)
      .limit(perPage),
  ]);

  return {
    projects,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
    hasNextPage: page * perPage < total,
    hasPreviousPage: page > 1,
  };
};
export const getProject = async (projectId) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) return null;
  return Project.findById(projectId);
};
export const createProject = async (project) => {
  return Project.create(project);
};
export const updateProject = async (projectId, project) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) return null;
  return Project.findByIdAndUpdate(projectId, project, { new: true });
};
export const deleteProject = async (projectId) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) return null;
  return Project.findByIdAndDelete(projectId);
};
export const replaceProject = async (projectId, project) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return null;
  }

  const result = await Project.findByIdAndUpdate(projectId, project, {
    new: true,
    upsert: true,
  });

  return {
    value: result,
    updatedExisting: !!result,
  };
};
