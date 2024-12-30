import axios from "axios";

const api = axios.create({
  baseURL: "localhost:3000", // Proxy to the backend
});

export default api;
