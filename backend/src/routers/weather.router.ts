import asyncHandler from "express-async-handler";
import { Router } from "express";
import axios from "axios";

const router = Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    try {
      const { city } = req.query;
      const API_KEY = process.env.API_KEY;
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

      const response = await axios.get(apiUrl);
      const weatherData = response.data;

      res.json(weatherData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error has occured" });
    }
  })
);

export default router;
