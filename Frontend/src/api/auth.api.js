import api from "./axios";

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const logoutUser = () =>
  api.post("/auth/logout");

export const forgotPassword = (data) =>
  api.post("/auth/forgetPassword", data);

export const verifyOTP = (data) =>
  api.post("/auth/verifyOTP", data);

export const resetPassword = (data) =>
  api.post("/auth/resetPassword", data);
