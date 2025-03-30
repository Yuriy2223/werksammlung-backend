import "dotenv/config";
import express from "express";
import "./mongo_db/db.ts";

const app = express();

app.use(express.json());

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

// app.use((err, req, res, next) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});
