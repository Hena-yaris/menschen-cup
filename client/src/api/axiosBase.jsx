import axios from 'axios'
const baseURLE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const axiosBase = axios.create({
  baseURL: baseURLE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token globally for all requests
axiosBase.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosBase;