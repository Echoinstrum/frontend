const API_BASE_URL = "https://localhost:7230/api/Projects"

//POST
export const createProject = async (projectData) => {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(projectData),
    });
    return response.json();
}

//GET
export const getProjects = async () => {
    const response = await fetch(API_BASE_URL);
    return response.json();
};