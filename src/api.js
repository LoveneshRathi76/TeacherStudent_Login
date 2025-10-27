import axios from "axios";

const API = axios.create({
  baseURL: "https://teacher-student-backend-asp3.onrender.com/api",
});

API.defaults.headers.post["Content-Type"] = "application/json";

export default API;
