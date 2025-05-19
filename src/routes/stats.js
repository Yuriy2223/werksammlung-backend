import express from "express";
import fetch from "node-fetch";
import { Stat } from "../models/stat";

const router = express.Router();

const getCountryFromIP = async (ip) => {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/country_name/`);
    const country = await response.text();
    return country || "Unknown";
  } catch (e) {
    console.error("IP fetch error:", e);
    return "Unknown";
  }
};

router.post("/", async (req, res) => {
  const { timeSpent } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  const country = await getCountryFromIP(ip);

  const newStat = new Stat({
    ip,
    country,
    timeSpent,
  });

  await newStat.save();
  res.status(201).json({ message: "Статистика збережена" });
});

router.get("/", async (req, res) => {
  const stats = await Stat.find().sort({ date: -1 });
  const totalViews = stats.length;
  const totalTime = stats.reduce((acc, s) => acc + (s.timeSpent || 0), 0);

  const countries = {};
  stats.forEach((s) => {
    countries[s.country] = (countries[s.country] || 0) + 1;
  });

  res.json({
    totalViews,
    totalTime,
    countries,
    raw: stats,
  });
});

export default router;
