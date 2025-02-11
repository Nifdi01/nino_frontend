import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  // Add timeout and withCredentials
  timeout: 5000,
  withCredentials: true
});

// List of endpoints that do not require Authorization header
const authFreeEndpoints = [
  "/auth/login",
  "/auth/register",
  "/auth/token/refresh"
];

// Request interceptor with detailed logging
api.interceptors.request.use(
  (config) => {
    console.group('API Request');
    console.log('URL:', config.url);
    // console.log('Method:', config.method);
    // console.log('Headers:', config.headers.AxiosHeaders);
    // console.log('Data:', config.data);
    // console.log('Token in LocalStorage:', localStorage.getItem("accessToken"));
    console.groupEnd();

    const isAuthFree = authFreeEndpoints.includes(config.url);
    
    if (!isAuthFree) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor with detailed error handling
api.interceptors.response.use(
  (response) => {
    console.group('API Response');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
    console.groupEnd();
    return response;
  },
  (error) => {
    console.group('API Error');
    if (error.response) {
      // Server responded with error
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else if (error.request) {
      // Request made but no response
      console.log('No response received:', error.request);
    } else {
      // Error in request setup
      console.log('Request setup error:', error.message);
    }
    // console.log('Config:', error.config);
    console.groupEnd();
    return Promise.reject(error);
  }
);

export default api;