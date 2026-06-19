import API from "./api";

// Get all projects
export const getAllProjects = () => API.get("/projects");

// Get my projects
export const getMyProjects = () => API.get("/projects/my");

// Get project by ID
export const getProjectById = (id) =>
  API.get(`/projects/${id}`);

// Create project
export const createProject = (formData) =>
  API.post("/projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Update project
export const updateProject = (id, formData) =>
  API.put(`/projects/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// Delete project
export const deleteProject = (id) =>
  API.delete(`/projects/${id}`);