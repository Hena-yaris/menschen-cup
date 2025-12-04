import axios from 'axios'

const axiosBase = axios.create({
    baseURL: "http://localhost:3000/api",
    headers: {
        "Content-Type" : "application/json"
    }
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