import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  replaceProject,
  updateProject,
} from "../../services/projects.js";

export const getProjectsController = async (req, res) => {
  try {
    const pagination = parsePaginationParams(req.query);
    const sorting = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const response = await getProjects({
      ...pagination,
      ...sorting,
      filter,
    });

    res.json({
      status: 200,
      message: "Projects fetched successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};
export const getProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getProject(id);
    if (!project) {
      throw new createHttpError.NotFound("Project not found");
    }

    res.json({
      status: 200,
      message: "Project fetched successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
  }
};
export const createProjectController = async (req, res) => {
  try {
    const result = await createProject(req.body);

    res.status(201).json({
      status: 201,
      message: "Project created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating project:", error);
  }
};
export const updateProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getProject(id);
    if (!project) {
      throw new createHttpError.NotFound("Project not found");
    }

    const updatedProject = await updateProject(id, req.body);

    res.json({
      status: 200,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    console.error("Error updating project:", error);
  }
};
export const deleteProjectController = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};
export const replaceProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const project = req.body;
    const result = await replaceProject(id, project);

    res.status(result.updatedExisting ? 200 : 201).json({
      status: result.updatedExisting ? 200 : 201,
      message: result.updatedExisting
        ? "Project updated successfully"
        : "Project created successfully",
      data: result.value,
    });
  } catch (error) {
    console.error("Error replacing project:", error);
  }
};
