import axios from "axios";

const API = axios.create({
  baseURL: "https://abhay-portfolio-api.onrender.com", // FastAPI backend
});

// ---- Projects ----
export const getProjects = () => API.get("/projects");
export const addProject = (project) => API.post("/projects", project);
export const updateProject = (id, project) => API.put(`/projects/${id}`, project);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// ---- Skills ----
export const getSkills = () => API.get("/skills");
export const addSkill = (skill) => API.post("/skills", skill);
export const updateSkill = (id, skill) => API.put(`/skills/${id}`, skill);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

// ---- Research ----
export const getResearch = () => API.get("/research");
export const addResearch = (research) => API.post("/research", research);
export const updateResearch = (id, research) => API.put(`/research/${id}`, research);
export const deleteResearch = (id) => API.delete(`/research/${id}`);

// ---- Experience ----
export const getExperience = () => API.get("/experience");
export const addExperience = (exp) => API.post("/experience", exp);
export const updateExperience = (id, exp) => API.put(`/experience/${id}`, exp);
export const deleteExperience = (id) => API.delete(`/experience/${id}`);


//verification
// api.js
export const sendForgotPasswordOTP = (email) => API.post("/forgot-password", { email });
export const verifyOTP = (email, otp) => 
  API.post("/verify-otp", {
    email: email,  // must match your backend model
    otp: otp       // string or number depending on backend
  });


  // reset password
export const resetPassword = (email, otp, newPassword, confirmPassword) =>
  API.post("/reset-password", {
    email: email,
    otp: otp,
    new_password: newPassword,
    confirm_password: confirmPassword,
  });

  // update login credential  
  // api.js
export const updateAdminCredential = (oldUsername, oldPassword, newUsername, newPassword) =>
  API.put("/update-admin-credential", {
    old_username: oldUsername,
    old_password: oldPassword,
    new_username: newUsername,
    new_password: newPassword,
  });

