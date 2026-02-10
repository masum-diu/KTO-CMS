import axios from "axios";
const instance = axios.create({
  baseURL: "https://ktobackend.etherstaging.xyz/api/v1",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
