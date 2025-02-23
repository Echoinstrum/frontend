import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import ProjectDetailModal from "./ProjectDetailModal";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    const fetchProjects = async () => {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch (error) {
            console.error("Error while fetching projects: ", error);
        }
    };

    useEffect(() => {
        fetchProjects(); 
    }, []);

    return (
        <div>
            <h2>Projektlista</h2>
            <button onClick={fetchProjects} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
            Hämta alla projekt
            </button>
            <ul>
                {projects.map((project) => (
                    <li key={project.id} className="border-b p-3 cursor-pointer" onClick={() => setSelectedProject(project)}>
                        <p><strong>Titel:</strong> {project.title}</p>  
                        <p><strong>Projektledare:</strong> {project.projectManager}</p> 
                        <p><strong>Status:</strong> {project.status}</p>
                    </li>
                ))}
            </ul>

            {selectedProject && (
                <ProjectDetailModal 
                    project={selectedProject} 
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
};

export default ProjectList;
