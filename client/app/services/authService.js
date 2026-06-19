import API from "./api";

export const registerUser = (userData) => {
  return API.post("/auth/register", userData);
};

export const loginUser = (userData) => {
  return API.post("/auth/login", userData);
};

export const getProfile = () => {
  return API.get("/auth/profile");
};

export const updateProfile = (formData) => {
  return API.put("/auth/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};