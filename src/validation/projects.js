import Joi from "joi";

const dateRegex = /^\d{2}-\d{2}-\d{4}$/;

export const projectSchema = Joi.object({
  imgUrl: Joi.string().uri().optional(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  author: Joi.string().min(3).max(50).required(),
  technologies: Joi.array().items(Joi.string()).required(),
  repositoryUrl: Joi.string().uri().allow(null),
  liveDemoUrl: Joi.string().uri().allow(null),
  date: Joi.string()
    .pattern(dateRegex)
    .message('"date" format DD-MM-YYYY')
    .required(),
});

export const updateProjectSchema = Joi.object({
  imgUrl: Joi.string().uri().optional(),
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).optional(),
  author: Joi.string().min(3).max(50).optional(),
  technologies: Joi.array().items(Joi.string()).optional(),
  repositoryUrl: Joi.string().uri().allow(null).optional(),
  liveDemoUrl: Joi.string().uri().allow(null).optional(),
  date: Joi.string()
    .pattern(dateRegex)
    .message('"date" format DD-MM-YYYY')
    .optional(),
});
