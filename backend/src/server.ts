import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200/"],
  })
);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
