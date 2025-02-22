import { useState } from "react"
import { createProject } from "../api/projectApi";

const ProjectForm = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [projectManager, setProjectManager] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [status, setStatus] = useState("");
    const [service, setService] = useState("");
    const [customerName, setCustomerName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Formulär skickat");


        if(!title.trim()) return;

        const newProject = {
            title,
            description,
            startDate,
            endDate,
            projectManager,
            totalPrice,
            status,
            service,
            customerName
        };

        console.log(newProject);

        try{
            await createProject(newProject);
            console.log("Projekt skapades!")
        } catch (error) {
            console.error("Fel vid skapandet av projekt: ", error)
        }

        // onProjectAdded();

        //reseting form
        setTitle("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setProjectManager("");
        setTotalPrice("");
        setStatus("");
        setService("");
        setCustomerName("");
    }
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Lägg till projekt</h2>
        <input
            type="text"
            placeholder="Projekttitel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded mb-2"
        />
        <textarea
            placeholder="Beskrivning"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded mb-2"
        />
        <input
            type="date"
            placeholder="Startdatum"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 w-full rounded mb-2" 
        />
        <input
            type="date"
            placeholder="Slutdatum"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 w-full rounded mb-2" 
        />
        <input
            type="text"
            placeholder="Projektansvarig"
            value={projectManager}
            onChange={(e) => setProjectManager(e.target.value)}
            className="border p-2 w-full rounded mb-2" 
        />
        <input
            type="number"
            placeholder="Pris"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            className="border p-2 w-full rounded mb-2" 
        />
        <input
            type="text"
            placeholder="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 w-full rounded mb-2" 
        />
        <input
            type="text"
            placeholder="Produkt"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="border p-2 w-full rounded mb-2" 
        />
        <input
            type="text"
            placeholder="Kundnamn"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border p-2 w-full rounded mb-2" 
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Skapa projekt
        </button>
    </form>
  )
}
export default ProjectForm