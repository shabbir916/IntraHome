import api from "./axios";

export const fetchUserProfile = () => api.get("/user/user-profile");

export const updateProfile = (data) => api.patch("/user/update-profile", data);

export const changePassword = (data) =>
  api.patch("/user/change-password", data);

export const deleteAccount = () => api.delete("/user/delete-account");

export const updateAvatar = (formData) =>
  api.patch("/user/update-avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
