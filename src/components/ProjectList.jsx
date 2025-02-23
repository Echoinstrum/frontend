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
        <>
            <div>
                <div className="flex justify-between pt-5">
                    <h2 className="text-3xl">Projektlista</h2>
                    <button onClick={fetchProjects} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                    Hämta alla projekt
                    </button>
                </div>
                <ul>
                    {projects.map((project) => (
                        <li key={project.id} className="border-b p-3 cursor-pointer" onClick={() => setSelectedProject(project)}>
                            <p><strong>Titel:</strong> {project.title}</p>   
                            <p><strong>StartDate:</strong>{project.startDate}</p>
                            <p><strong>endDate:</strong>{project.endDate}</p>
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
        </>
    );
};

export default ProjectList;
