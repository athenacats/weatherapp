import asyncHandler from "express-async-handler";
import { Router } from "express";
import axios from "axios";

const router = Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "1800");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

router.get(
  "/weather/:searchTerm",
  asyncHandler(async (req, res) => {
    try {
      const { city } = req.query;
      console.log(city);
      const API = process.env.API_KEY!;
      const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API}&q=${city}&days=7&aqi=no&alerts=no`;

      const response = await axios.get(apiUrl);
      const weatherData = response.data;

      res.json(weatherData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error has occured" });
    }
  })
);

router.get(
  "/forecast",
  asyncHandler(async (req, res) => {
    try {
      const { city } = req.query;

      const API = process.env.API_KEY!;
      const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API}&q=${city}&days=7&aqi=no&alerts=no`;

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
