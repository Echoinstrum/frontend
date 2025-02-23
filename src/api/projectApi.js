const API_BASE_URL = "https://localhost:7230/api/Projects"

//POST
export const createProject = async (projectData) => {
    const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
    });

    const responseData = await response.json();

   
    console.log(responseData); 

    return responseData;
};

//GET
export const getProjects = async () => {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    console.log("Hämtade projekt:", data);
    return data;
};
//PUT
// Got help from ChatGPT-4o with some debbuging / error handling messages here.
export const updateProject = async (id, updatedProject) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProject),
    });

   
    if (!response.ok) { 
        const errorText = await response.text(); 
        console.error("Fel vid uppdatering av projekt:", errorText); 
        throw new Error("Kunde inte uppdatera projektet");
    }

    const responseText = await response.text();
    if (!responseText) {
        throw new Error("Tomt svar från servern");
    }

    
    return JSON.parse(responseText);
};