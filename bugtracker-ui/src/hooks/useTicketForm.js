import apiClient from "../services/apiClient.js";
import { useAuthContext } from "../contexts/auth.jsx"
import { useState } from "react"
import { useTeamContext } from "../contexts/team.jsx";


// hook to use when creating new tickets 
export const useTicketForm = () => {
    const { user } = useAuthContext();
    const { fetchTeams, setTeamModal,setCurrentTeam } = useTeamContext();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [developers, setDevelopers] = useState([]);
    const [complexity, setComplexity] = useState("");
    const [status, setStatus] = useState("");
    const [priortiy, setPriority] = useState("")
    const [errors, setErrors] = useState("");
    

    const handleOnCreateNewTicketSubmit = async () => {

    };

    return {
        handleOnCreateNewTicketSubmit,
        title, setTitle, description, setDescription, developers, setDevelopers, complexity,setComplexity, status, setStatus, priortiy,setPriority,errors,setErrors
    }
}