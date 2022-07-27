import { useState } from "react";
import apiClient from "../services/apiClient"
import { useTeamContext } from "../contexts/team";
import { useAuthContext } from "../contexts/auth";

// hook to use when creating new teams 
export const useTeamForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [teamName, setTeamName] = useState("");
    const [developers, setDevelopers] = useState([]);
    const [projectsToAdd, setProjectsToAdd] = useState([]);
    const [errors, setErrors] = useState("");
    const [developer, setDeveloper] = useState("");
    const { fetchTeams} = useTeamContext();
    const { user } = useAuthContext();
    const { setTeamModal } = useTeamContext();

    // handler to create a new team 
    const handleOnCreateNewTeamSubmit = async () => {
        // before sending request to create a new team, verify name field is not empty
        console.log("HOOK NAME: ", teamName)
        // if (name == "") {
        //      setErrors("Please name your team before submitting!");
        // } else {
        //     console.log("Else")
        // // if name field was not empty: send request to create a new team
        // const { data, error } = await apiClient.createNewTeam({
        //     name: name,
        //     members: [...developers, user.email],
        //     projects: projectsToAdd,
        // });

        // // if api request to create a new team was successful: fetchTeams to get updated list of teams, clear all input fields, and setModal to false to exit modal
        // if (data) {
        //     // TODO: popup message "team successfully created"
        //     fetchTeams();
        //     setName("");
        //     setDevelopers([]);
        //     setProjectsToAdd([]);
        //     setTeamModal(false);
        //     console.log("Closing")
        // } else if (error) {
        //     setErrors("Something went wrong! Try again.");
        // }
        // }
    };

    // handlers for input change
    const handleOnDeveloperChange = (event) => {
        setDeveloper(event.target.value);
    };

    const handleOnNameChange = (event) => {
        console.log("HOOK:" , event.target.value)
        setTeamName(event.target.value);
        console.log("HOOK NAMEEE: ", teamName);
      };



    // handler function to attempt to add a developer to the list of developers to add to the team
    const handleOnDeveloperSubmit = async (dev) => {
        if (developer.indexOf("@") === -1) {
            setErrors("Please enter a valid email.");
        } else if (developers.indexOf(developer) >= 0 || developer == user.email) {
            // if user has already been added, or a user is trying to add their own email, display error
            setErrors("User already added!");
        } else {
            setErrors("");
            // display Not found error if user cannot be found with the email provided
            const { data, error } = await apiClient.checkValidEmail(dev);
            if (data) {
                setDevelopers((d) => [...d, dev]);
                setDeveloper("");
            } else if (error) {
                setErrors("No user found with that email!");
            }
        }
    };





    return {
    teamName,
    setTeamName,
    developers,
    setDevelopers,
    developer,
    setDeveloper,
    projectsToAdd,
    setProjectsToAdd,
    errors,
    setErrors,
    handleOnCreateNewTeamSubmit,
    handleOnDeveloperChange,
    handleOnDeveloperSubmit,
    handleOnNameChange
    }
}