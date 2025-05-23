import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { uploadCloudinary } from "../utils/uploadCloudinary.js";
import { Project } from "../models/project.js";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  replaceProject,
  updateProject,
} from "../services/projects.js";

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
    await User.findByIdAndUpdate(req.body.userId, {
      $push: { projects: result._id },
    });

    res.status(201).json({
      status: 201,
      message: "Project created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error creating project:", error);
  }
};

// // якщо через фром дату все разом
// export const createProjectController = async (req, res, next) => {
//   try {
//     let imgUrl = null;

//     if (req.file) {
//       const base64Str = req.file.buffer.toString("base64");
//       const mimeType = req.file.mimetype;
//       const dataUri = `data:${mimeType};base64,${base64Str}`;

//       const uploadResult = await uploadCloudinary.uploader.upload(dataUri, {
//         folder: "portfolio",
//       });

//       imgUrl = uploadResult.secure_url;
//     }

//     const projectData = {
//       ...req.body,
//       imgUrl,
//     };

//     const result = await createProject(projectData);

//     await User.findByIdAndUpdate(req.body.userId, {
//       $push: { projects: result._id },
//     });

//     res.status(201).json({
//       status: 201,
//       message: "Project created successfully",
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

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

// // якщо через фром дату все разом
// export const updateProjectController = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const project = await getProject(id);
//     if (!project) {
//       throw new createHttpError.NotFound("Project not found");
//     }

//     const updateData = { ...req.body };

//     if (req.file) {
//       const base64Str = req.file.buffer.toString("base64");
//       const mimeType = req.file.mimetype;
//       const dataUri = `data:${mimeType};base64,${base64Str}`;

//       const uploadResult = await uploadCloudinary.uploader.upload(dataUri, {
//         folder: "portfolio",
//       });

//       updateData.imgUrl = uploadResult.secure_url;
//     }

//     const updatedProject = await updateProject(id, updateData);

//     res.json({
//       status: 200,
//       message: "Project updated successfully",
//       data: updatedProject,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

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

// // якщо окремо завантажувати картинку в проєкт
export const uploadImageController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      throw new createHttpError.BadRequest("Image file is required");
    }

    const base64Str = req.file.buffer.toString("base64");
    const mimeType = req.file.mimetype;
    const dataUri = `data:${mimeType};base64,${base64Str}`;
    const uploadResult = await uploadCloudinary(dataUri);
    const imgUrl = uploadResult.secure_url;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { imgUrl },
      { new: true }
    );

    if (!updatedProject) {
      throw new createHttpError.NotFound("Project not found");
    }

    res.json({
      status: 200,
      message: "Project image updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};
