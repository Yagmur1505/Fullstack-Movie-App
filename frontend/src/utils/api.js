import axios from "axios"; // Doğru import
const api = axios.create({
  baseURL: "http://127.0.0.1:4090", // Backend API URL
});
export default api;
