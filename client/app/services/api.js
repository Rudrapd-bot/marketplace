import axios from "axios";

const API = axios.create({
  baseURL:
  process.env.NODE_ENV === "production"
    ? "https://marketplace-7xwt.onrender.com/api"
    : "http://localhost:5000/api",

  headers: {
    "Content-Type": "application/json",
  },
});




// Automatically attach JWT
API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default API;
