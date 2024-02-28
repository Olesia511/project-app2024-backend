import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import authRouter from "./routes/api/authRouter.js";

const app = express();

app.use(logger("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);

app.use((req, res) => {
  console.log(`req`, req);
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
