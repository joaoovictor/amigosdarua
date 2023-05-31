import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.5:9095/api/"
})

export default api;