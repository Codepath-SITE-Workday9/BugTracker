import { useAuthContext } from "../contexts/auth.jsx"
import { useState } from "react"
import apiClient from "../services/apiClient.js";
import { useTeamContext } from "../contexts/team.jsx";
// hook to use when creating new teams 
export const useTeamForm = () => {
    const { user } = useAuthContext();
    const { fetchTeams, setTeamModal,setCurrentTeam } = useTeamContext();
    const [name, setName] = useState("");
    const [developers, setDevelopers] = useState([]);
    const [projectsToAdd, setProjectsToAdd] = useState([]);
    const [errors, setErrors] = useState("");
    

    const handleOnCreateNewTeamSubmit = async () => {
        // before sending request to create a new team, verify name field is not empty
        if (name == "") {
          setErrors("Please name your team before submitting!");
        } else {
          // if name field was not empty: send request to create a new team
          const { data, error } = await apiClient.createNewTeam({
            name: name,
            members: [...developers, user.email],
            projects: projectsToAdd,
          });
    
          // if api request to create a new team was succesful: fetchTeams to get updated list of teams, clear all input fields, and setTeamModal to false to exit modal
          if (data) {
            // TODO: popup message "team successfully created"
            fetchTeams();
            setName("");
            setDevelopers([]);
            setProjectsToAdd([]);
            setTeamModal(false);
            setCurrentTeam(data.team)
          } else if (error) {
            setErrors("Something went wrong! Try again.");
          }
        }
      };

    return {
        name,
        setName,
        developers,
        setDevelopers,
        projectsToAdd,
        setProjectsToAdd,
        errors,
        setErrors,
        handleOnCreateNewTeamSubmit
    }
}