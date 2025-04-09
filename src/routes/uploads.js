import express from "express";
import path from "node:path";

export const uploadRouters = express.Router();

uploadRouters.post("/uploads", express.static(path.resolve("src", "uploads")));
