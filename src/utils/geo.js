import axios from "axios";

export const getCountryFromIP = async (ip) => {
  try {
    const { data } = await axios.get(`https://ipapi.co/${ip}/country_name/`);
    return data || "Unknown";
  } catch (e) {
    console.error("IP lookup error:", e.message);
    return "Unknown";
  }
};
