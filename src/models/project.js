import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    images: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
    repositoryUrl: {
      type: String,
      default: null,
    },
    liveDemoUrl: {
      type: String,
      default: null,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
