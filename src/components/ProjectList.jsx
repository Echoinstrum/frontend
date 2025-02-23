import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import ProjectDetailModal from "./ProjectDetailModal";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error("error while fetching projects: ", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div>
            <h2>Projektlista</h2>
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
