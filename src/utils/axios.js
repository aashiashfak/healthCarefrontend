import axios from "axios";

// Set base URL based on the environment
const isLocalhost = window.location.hostname === "localhost";
const baseURL = isLocalhost
  ? "http://localhost:8000/" 
  : "https://health-care-backend-ivory.vercel.app/"; 

// Axios instance for regular API calls
const instance = axios.create({
  baseURL,
});

export default instance;
