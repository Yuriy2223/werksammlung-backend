import * as fs from "node:fs/promises";
import path from "path";
import createHttpError from "http-errors";

export const getProjectsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const response = await getProject({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    projectId: req.project.id,
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

  if (student === null) {
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

export const createProjecController = async (req, res) => {
  let avatar = null;

  if (getEnvVar("UPLOAD_TO_CLOUDINARY") === "true") {
    const result = await uploadToCloudinary(req.file.path);

    avatar = result.secure_url;
  } else {
    await fs.rename(
      req.file.path,
      path.resolve("src", "uploads", req.file.filename)
    );

    // avatar = `http://localhost:3000/uploads/${req.file.filename}`;
    avatar = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
  }

  const project = {
    ...req.body,
    projectId: req.project.id,
    avatar,
  };
  const result = await createProject(project);

  res.status(201).json({
    status: 201,
    message: "Project created successfully",
    data: result,
  });
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
  const project = req.body;
  const result = await updateProject(id, project);

  if (result === null) {
    throw new createHttpError.NotFound("Project not found");
  }

  res.json({
    status: 200,
    message: "Project updated successfully",
    data: result,
  });
};
