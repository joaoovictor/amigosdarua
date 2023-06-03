import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.5:9095/api/"
})

export const apiKeyGoogle = "AIzaSyDirF8k5QX88A7i08dVyoOx0wBxlvUzI4s"

export default api;