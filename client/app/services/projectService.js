import API from "./api";

// Get all projects
export const getAllProjects = () => {
  return API.get("/projects");
};

// Get my projects
export const getMyProjects = () => {
  return API.get("/projects/my");
};

// Get single project
export const getProjectById = (id) => {
  return API.get(`/projects/${id}`);
};

// Create project
export const createProject = (formData) => {
  return API.post("/projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update project
export const updateProject = (id, formData) => {
  return API.put(`/projects/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete project
export const deleteProject = (id) => {
  return API.delete(`/projects/${id}`);
};