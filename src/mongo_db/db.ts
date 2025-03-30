import "dotenv/config";
import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

console.log("DB_URI:", process.env.DB_URI);

if (!DB_URI) {
  throw new Error("DB_URI is not defined");
}

async function run() {
  try {
    await mongoose.connect(DB_URI as string);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error", error);
    // process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

run().catch(console.error);
