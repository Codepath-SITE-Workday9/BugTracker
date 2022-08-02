import apiClient from "../services/apiClient.js";
import { useState } from "react"
import { useTicketContext } from "../contexts/ticket.jsx";


// hook to use when creating new tickets 
export const useTicketForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [developersToAdd, setDevelopersToAdd] = useState(["Katherin@codepath.com"]);
    const [complexity, setComplexity] = useState("1");
    const [status, setStatus] = useState("unassigned");
    const [priority, setPriority] = useState("low");
    const [category, setCategory] = useState("bug");
    const [errors, setErrors] = useState("");
    
    const {setCurrentTicket, setTicketModal} = useTicketContext();
    const devs = ["a@b"]
    
    const handleOnCreateNewTicketSubmit = async () => {
        // before sending request to create a new ticket, verify title & description is not empty
        if (title == "") {
            setErrors("Please name your ticket before submitting!");
        }else if(description == "")  {
            setErrors("Please add a brief description to your ticket!")
        }else{
            // send request to create a new ticket
              // must send: 
              // title, description, category, priority, status, complexity, the developers (array of emails), projectId
            const { data, error } = await apiClient.createNewTicket({
              title: title,
              description: description,
              category: category,
              priority: priority,
              status: status,
              complexity:complexity,
              developers: devs,
              projectId: 3, //TODO: CHANGE THIS TO CORRECT PROJECT ID!
            });
      
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
            } else if (error) {
              setErrors("Something went wrong! Try again.");
            }
          }
        
    };

    return {
        handleOnCreateNewTicketSubmit,
        title, setTitle, description, setDescription, developersToAdd, setDevelopersToAdd, complexity,setComplexity, status, setStatus, priority,setPriority,category,setCategory,errors,setErrors
    }
}