import { Project } from "../models/project.js";

export const getProjects = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const projectQuery = Project.find();

  if (typeof filter.minYear !== "undefined") {
    projectQuery.where("date").gte(filter.minYear);
  }

  if (typeof filter.maxYear !== "undefined") {
    projectQuery.where("date").lte(filter.maxYear);
  }

  const [total, projects] = await Promise.all([
    Project.countDocuments({
      ...filter,
    }),
    projectQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    projects,
    total,
    page,
    perPage,
    totalPages,
    hasNextPage: totalPages > page,
    hasPreviousPage: page > 1,
  };
};

export function getProject(projectId) {
  return Project.findById(projectId);
}

export function deleteProject(projectId) {
  return Project.findByIdAndDelete(projectId);
}

export function createProject(project) {
  return Project.create(project);
}

export async function replaceProject(projectId, project) {
  const result = await Project.findByIdAndUpdate(projectId, project, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });

  return {
    value: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
}

export async function updateProject(projectId, project) {
  return Project.findByIdAndUpdate(projectId, project, { new: true });
}
