import * as fs from "node:fs/promises";
import path from "path";
import createHttpError from "http-errors";
import { getEnvVar } from "../utils/getEnvVar.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  replaceProject,
  updateProject,
} from "../services/progects.js";

export const getProjectsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const response = await getProjects({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: "Projects fetched successfully",
    data: response,
  });
};

export const getProjectController = async (req, res) => {
  const { id } = req.params;

  const project = await getProject(id);

  if (project === null) {
    throw new createHttpError.NotFound("Project not found");
  }

  if (project.projectId.toString() !== req.project.id.toString()) {
    throw new createHttpError.NotFound("Project not found");
  }

  res.json({
    status: 200,
    message: "Project fetched successfully",
    data: project,
  });
};

export const deleteProjectController = async (req, res) => {
  const { id } = req.params;

  const result = await deleteProject(id);

  if (result === null) {
    throw new createHttpError.NotFound("Project not found");
  }

  res.json({
    status: 200,
    message: "Project deleted successfully",
    data: result,
  });
};

export const createProjectController = async (req, res) => {
  try {
    let imgUrl = req.body.imgUrl || null;

    if (req.file) {
      if (getEnvVar("UPLOAD_TO_CLOUDINARY") === "true") {
        const result = await uploadToCloudinary(req.file.path);
        imgUrl = result.secure_url;
      } else {
        const uploadPath = path.resolve("src", "uploads", req.file.filename);
        await fs.rename(req.file.path, uploadPath);
        imgUrl = `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`;
      }
    }

    const project = {
      ...req.body,
      imgUrl,
    };

    const result = await createProject(project);

    res.status(201).json({
      status: 201,
      message: "Project created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in createProjecController:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const replaceProjectController = async (req, res) => {
  const { id } = req.params;
  const project = req.body;
  const result = await replaceProject(id, project);

  if (result.updatedExisting === true) {
    return res.json({
      status: 200,
      message: "Project updated successfully",
      data: result.value,
    });
  }

  res.status(201).json({
    status: 201,
    message: "Project created successfully",
    data: result.value,
  });
};

export const updateProjectController = async (req, res) => {
  const { id } = req.params;

  const project = await getProject(id);

  if (!project) {
    throw new createHttpError.NotFound("Project not found");
  }

  if (req.file) {
    let imgUrl = null;
    if (getEnvVar("UPLOAD_TO_CLOUDINARY") === "true") {
      const result = await uploadToCloudinary(req.file.path);
      imgUrl = result.secure_url;
    } else {
      const uploadPath = path.resolve("src", "uploads", req.file.filename);
      await fs.rename(req.file.path, uploadPath);
      imgUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    project.imgUrl = imgUrl;
  }

  const updatedProject = await updateProject(id, project);

  res.json({
    status: 200,
    message: "Project updated successfully",
    data: updatedProject,
  });
};
