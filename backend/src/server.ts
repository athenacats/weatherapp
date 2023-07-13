import asyncHandler from "express-async-handler";
import express from "express";
import cors from "cors";
import weatherRouter from "./routers/weather.router";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200/"],
  })
);

app.use("/api", weatherRouter);

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
