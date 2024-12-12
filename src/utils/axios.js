import axios from "axios";

const baseUrl = "http://localhost:8000/";

// Axios instance for regular API calls
const instance = axios.create({
  baseURL: baseUrl,
});

export default instance;