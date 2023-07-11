import asyncHandler from "express-async-handler";
import express from "express";
import cors from "cors";
import weatherRouter from "./routers/weather.router";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200/"],
  })
);

app.use("/api", weatherRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
