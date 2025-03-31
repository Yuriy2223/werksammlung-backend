import { Project } from "../models/project";

export const getStudents = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
  progectId,
}) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const projectQuery = Project.find({ progectId });

  if (typeof filter.minYear !== "undefined") {
    projectQuery.where("year").gte(filter.minYear);
  }

  if (typeof filter.maxYear !== "undefined") {
    projectQuery.where("year").lte(filter.maxYear);
  }

  const [total, projects] = await Promise.all([
    Project.countDocuments(projectQuery),
    projectQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    progects,
    total,
    page,
    perPage,
    totalPages,
    hasNextPage: totalPages > page,
    hasPreviousPage: page > 1,
  };
};

export function getStudent(progectId) {
  return Project.findById(progectId); // findOne({ _id: id })
}

export function deleteStudent(progectId) {
  return Project.findByIdAndDelete(progectId); // findOneAndDelete({ _id: id })
}

export function createStudent(progect) {
  return Project.create(progect);
}

export async function replaceStudent(progectId, progect) {
  const result = await Project.findByIdAndUpdate(progectId, progect, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });

  return {
    value: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
}

export async function updateStudent(progectId, progect) {
  return Project.findByIdAndUpdate(progectId, progect, { new: true });
}
