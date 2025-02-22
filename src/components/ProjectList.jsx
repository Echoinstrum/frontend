import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";


const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Fel vid hämtning av projekt: ", error);
            }
        };

        fetchProjects();
    }, []);


  return (
    <div>
        <h2></h2>
        <ul >
            {projects.map((project) => (
                <li key={project.id} className="border-b p-3">
                    <p>Project Title: {project.title}</p>  
                    <p>Project Manager: {project.projectManager}</p> 
                    <p>Status: {project.status}</p>
                </li>
            ))}
        </ul>
    </div>
  )
}
export default ProjectList