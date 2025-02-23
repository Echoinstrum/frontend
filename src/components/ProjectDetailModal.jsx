/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import { updateProject } from "../api/projectApi";
import { deleteProject } from "../api/projectApi";

const ProjectDetailModal = ({ project, onClose }) => {
    const [editedProject, setEditedProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        if (project) {
            setEditedProject({ ...project });
        }
    }, [project]);

    if (!editedProject) return null;

    const handleSave = async () => {
        try {
            //Got some help from ChatGPT-4o here. 
            // Updating the project's status with the selected value.
            // If no status is chosen, it defaults to "Ej påbörjat"
            const updatedProjectWithCorrectStatus = {
                ...editedProject,
                status: editedProject.status || "Ej påbörjat" 
            };
    
            await updateProject(project.id, updatedProjectWithCorrectStatus);
            setIsEditing(false);
            onClose();
        } catch (error) {
            console.error("error while updating project: ", error);
        }
    };

    const handleDelete = async () => {
        try {
            // Call the API to delete the project
            await deleteProject(project.id);
            // Close the modal after deletion
            onClose();
            alert("Projektet har tagits bort");
        } catch (error) {
            console.error("Error while deleting project: ", error);
        }
    };

    const handleCancel = () => {
        setEditedProject({ ...project });
        setIsEditing(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-2">{editedProject.title}</h2>
                <p><strong>Projektnummer:</strong> {project.projectNumber}</p>
                <p><strong>Kundnamn:</strong> {project.customerName}</p>

                {isEditing ? (
                    <>
                        <p><strong>Projektnamn</strong></p>
                        <input type="text" value={editedProject.title} 
                               onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })} 
                               className="border p-2 w-full rounded mb-2" />
                        <p><strong>Beskrivning</strong></p>
                        <textarea value={editedProject.description} 
                                  onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })} 
                                  className="border p-2 w-full rounded mb-2" />
                        <p><strong>Startdatum</strong></p>
                        <input type="date" value={editedProject.startDate} 
                               onChange={(e) => setEditedProject({ ...editedProject, startDate: e.target.value })} 
                               className="border p-2 w-full rounded mb-2" />
                        <p><strong>Slutdatum</strong></p>
                        <input type="date" value={editedProject.endDate} 
                               onChange={(e) => setEditedProject({ ...editedProject, endDate: e.target.value })} 
                               className="border p-2 w-full rounded mb-2" />
                        <p><strong>Projektansvarig</strong></p>
                        <input type="text" value={editedProject.projectManager} 
                               onChange={(e) => setEditedProject({ ...editedProject, projectManager: e.target.value })} 
                               className="border p-2 w-full rounded mb-2" />
                        <p><strong>Total kostnad</strong></p>
                        <input type="number" value={editedProject.totalPrice} 
                               onChange={(e) => setEditedProject({ ...editedProject, totalPrice: e.target.value })} 
                               className="border p-2 w-full rounded mb-2" />
                        <p><strong>Status</strong></p>
                        <select
                            value={editedProject.status}
                            onChange={(e) => setEditedProject({ ...editedProject, status: e.target.value })}
                            className="border p-2 w-full rounded mb-2"
                        >
                            <option value="Ej påbörjat">Ej påbörjat</option>
                            <option value="Pågående">Pågående</option>
                            <option value="Avslutat">Avslutat</option>
                        </select>
                        <p><strong>Tjänst</strong></p>
                        <input type="text" value={editedProject.service} 
                               onChange={(e) => setEditedProject({ ...editedProject, service: e.target.value })} 
                               className="border p-2 w-full rounded mb-2" />

                        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">Spara</button>
                        <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Avbryt</button>
                    </>
                ) : (
                    <>
                        <p><strong>Projektnamn:</strong> {editedProject.title}</p>
                        <p><strong>Beskrivning:</strong> {editedProject.description}</p>
                        <p><strong>Startdatum:</strong> {editedProject.startDate}</p>
                        <p><strong>Slutdatum:</strong> {editedProject.endDate}</p>
                        <p><strong>Projektansvarig:</strong> {editedProject.projectManager}</p>
                        <p><strong>Totalt pris:</strong> {editedProject.totalPrice}</p>
                        <p><strong>Status:</strong> {editedProject.status}</p>
                        <p><strong>Tjänst:</strong> {editedProject.service}</p>

                        <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Redigera</button>
                    </>
                )}
                <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Stäng</button>
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Ta bort projekt</button>
            </div>
        </div>
    );
};

export default ProjectDetailModal;