import axios from "axios";

const api = axios.create({
  baseURL: "/api", // all requests go through Next.js API routes
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
