// api.js
import axios from "axios";

// Base Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Replace with your Django server URL
  headers: {
    "Content-Type": "application/json",
  },
});

// List of endpoints that do not require Authorization header
const authFreeEndpoints = [
  "/users/login/",
  "/users/register/",
  "/token/refresh/",
];

// Helper function to check if a URL is auth-free
const isAuthFreeEndpoint = (url) => {
  return authFreeEndpoints.some((endpoint) => url.endsWith(endpoint));
};

// Attach Authorization header to every request except auth endpoints
api.interceptors.request.use(
  (config) => {
    const url = config.url;
    const isAuthFree = isAuthFreeEndpoint(url);
    // console.log(`Request to ${url}, Auth-Free: ${isAuthFree}`); // Debug

    if (!isAuthFree) {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        window.location.href = "/login";
        throw new axios.Cancel("No access token available.");
      }
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses, including token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // console.log(`Response error for ${originalRequest.url}, Status: ${error.response?.status}`); // Debug

    if (error.response?.status === 401 && !isAuthFreeEndpoint(originalRequest.url)) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // Attempt to refresh the access token
          const { data } = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
            refresh: refreshToken,
          });
          localStorage.setItem("accessToken", data.access);
          originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
          return axios(originalRequest); // Retry the failed request
        } catch (refreshError) {
          // If refresh fails, clear tokens and redirect to login
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        // If no refresh token is available, clear storage and redirect
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
