import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    error.message =
      error?.response?.data?.message || "Something went wrong";
    return Promise.reject(error);
  }
);

export default api;
