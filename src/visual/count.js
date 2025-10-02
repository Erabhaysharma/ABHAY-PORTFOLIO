// src/visual/count.js
import { getProjects, getSkills, getExperience, getResearch } from "../api";

let totalProjects = 0;
let totalSkills = 0;
let totalExperience = 0;
let totalResearch = 0;

export const fetchCounts = async () => {
  try {
    // Projects
    const projectsRes = await getProjects();
    totalProjects = projectsRes.data.length;

    // Skills
    const skillsRes = await getSkills();
    totalSkills = skillsRes.data.reduce((acc, cat) => acc + cat.skills.length, 0);

    // Experience
    const expRes = await getExperience();
    totalExperience = expRes.data.length;

    // Research
    const researchRes = await getResearch();
    totalResearch = researchRes.data.length;

    return { totalProjects, totalSkills, totalExperience, totalResearch };
  } catch (err) {
    console.error("Error fetching counts:", err);
    return { totalProjects, totalSkills, totalExperience, totalResearch };
  }
};

// Optional: export counts individually for direct access
export { totalProjects, totalSkills, totalExperience, totalResearch };
