import { refreshToken } from "@/services/auth";
import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = "http://localhost:8000";
axiosInstance.defaults.timeout = 1000 * 60 * 10;
axiosInstance.defaults.headers["Content-Type"] = "application/json";
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Cache-Control"] = "no-cache";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshTokenPromise: Promise<unknown> | null = null;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.data?.error?.statusCode === 410) {
      location.href = "/login";
    }
    console.log("error in instance", error);
    const originalRequest = error.config;
    if (
      error.response?.data?.error?.statusCode === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken()
          .then((response) => {
            // return response.data?.data?.accessToken;
          })
          .catch(() => {
            location.href = "/login";
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }
      return refreshTokenPromise.then(() => {
        return axiosInstance(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
