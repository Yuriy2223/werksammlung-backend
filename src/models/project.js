import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    imgUrl: {
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
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
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
    date: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const Project = mongoose.model("Project", projectSchema);
