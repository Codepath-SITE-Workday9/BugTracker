import apiClient from "../services/apiClient.js";
import { useState } from "react"
import { useTicketContext } from "../contexts/ticket.jsx";
import { useAuthContext } from "../contexts/auth.jsx";
import { useProjectContext } from "../contexts/project.jsx";


// hook to use when creating new tickets 
export const useTicketForm = () => {
    const {user} = useAuthContext();
    const {fetchProjects} = useProjectContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [developersToAdd, setDevelopersToAdd] = useState([user.email]);
    const [complexity, setComplexity] = useState("1");
    const [status, setStatus] = useState("unassigned");
    const [priority, setPriority] = useState("low");
    const [category, setCategory] = useState("bug");
    const [errors, setErrors] = useState("");
    const [ticketProject, setTicketProject] = useState({});
    // const [selectedProject, setSelectedProject] = useState()
    
    const {setCurrentTicket, setTicketModal, setEditing, setTicketToEdit, editing, ticketToEdit, selectedProject,setSelectedProject,fetchAllTickets} = useTicketContext();
    
    const handleOnCreateNewTicketSubmit = async () => {
      // before sending request to create a new ticket, verify title & description is not empty
      if (title == "") {
          setErrors("Please name your ticket before submitting!");
      }else if(description == "")  {
          setErrors("Please add a brief description to your ticket!")
      }else{
        if(!editing){
          // send request to create new a ticket
            // must send: 
            // title, description, category, priority, status, complexity, the developers (array of emails), projectId
            const { data, error } = await apiClient.createNewTicket({
              title: title,
              description: description,
              category: category,
              priority: priority,
              status: status,
              complexity:complexity,
              developers: developersToAdd,
              projectId: selectedProject,
            });
            // if api request to create a new ticket was succesful: fetchTickets to get updated list of tickets, clear all input fields, and setTicketModal to false to exit modal
            if (data) {
              // TODO: popup message "team successfully created"
              fetchAllTickets()
              setTitle("");
              setDescription("");
              setDevelopersToAdd([]);
              setStatus("unassigned");
              setPriority("low");
              setComplexity("1");
              setCategory("bug");
              setTicketModal(false);
              setCurrentTicket(data.ticket)
              setEditing(false);
              setTicketToEdit()
              fetchProjects();
            } else if (errors) {
              setErrors("Something went wrong! Try again.");
            }
            // else, send request to update ticket info
          } else{
            const { data, error } = await apiClient.updateTicket(ticketToEdit.id,{
              title: title,
              description: description,
              category: category,
              priority: priority,
              status: status,
              complexity:complexity,
              developers: developersToAdd,
              project_id: selectedProject, 
            })
             // if api request to create a new ticket was succesful: fetchTickets to get updated list of tickets, clear all input fields, and setTicketModal to false to exit modal
             if (data) {
              // TODO: popup message "team successfully created"
            //   fetchTickets()
              setTitle("");
              setDescription("");
              setDevelopersToAdd([]);
              setStatus("unassigned");
              setPriority("low");
              setComplexity("1");
              setCategory("bug");
              setTicketModal(false);
              setCurrentTicket(data.ticket)
              setEditing(false);
              setTicketToEdit({});
              fetchProjects();
              fetchAllTickets();
            } else if (errors) {
              setErrors("Something went wrong! Try again.");
            } 
          }
        }
    };

    return {
        handleOnCreateNewTicketSubmit,
        title, setTitle, description, setDescription, developersToAdd, setDevelopersToAdd, complexity,setComplexity, status, setStatus, priority,setPriority,category,setCategory,errors,setErrors, ticketProject, setTicketProject,    selectedProject,
        setSelectedProject,
    }
}