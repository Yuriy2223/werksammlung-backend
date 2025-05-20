import { Stat } from "../models/stat.js";
import { getCountryFromIP } from "../utils/geo.js";

export const createStat = async (req, res) => {
  try {
    const { timeSpent } = req.body;
    // const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const ip = (
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      ""
    )
      .split(",")[0]
      .trim();

    const country = await getCountryFromIP(ip);

    const newStat = new Stat({ ip, country, timeSpent });
    await newStat.save();

    res.status(201).json({ message: "Статистика збережена" });
  } catch (err) {
    res.status(500).json({ error: "Помилка при збереженні статистики" });
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await Stat.find().sort({ date: -1 });

    const totalViews = stats.length;
    const totalTime = stats.reduce((acc, s) => acc + (s.timeSpent || 0), 0);

    const countries = {};
    stats.forEach(({ country }) => {
      countries[country] = (countries[country] || 0) + 1;
    });

    res.json({ totalViews, totalTime, countries, raw: stats });
  } catch (err) {
    res.status(500).json({ error: "Помилка при отриманні статистики" });
  }
};
