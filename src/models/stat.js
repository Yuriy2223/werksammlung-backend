import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  ip: String,
  country: String,
  timeSpent: Number,
  date: { type: Date, default: Date.now },
});

export const Stat = mongoose.model("Stat", statSchema);
