import {useState} from "react"
import { useProjectContext } from "../contexts/project";
import apiClient from "../services/apiClient";


// hook to use when creating new projects 
export const useProjectForm = () => {
    const [projectName, setProjectName] = useState("");
    const [teamsToAdd, setTeamsToAdd] = useState([]);
    const [projectDescription, setProjectDescription] = useState("");
    const {fetchProjects, setProjectModal, projects, setCurrentProject, projectToEdit, setProjectToEdit, editing, setEditing} = useProjectContext();
    const [errors, setErrors] = useState({
      name: "",
      description: "",
      team: "",
    });
    
    const handleOnCreateNewProjectSubmit = async () => {
      //before sending request to create new project, verify name and description fields are not empty, and at least one team has been assigned.
      if (projectName == "") {
        setErrors((e) => ({
          ...e,
          name: "Please name your project",
        }));
      }
      if (projectDescription == "") {
        setErrors((e) => ({
          ...e,
          description: "Please add description to your project",
        }));
      }
      if(!editing)
      {
        // if (teamsToAdd.length == 0) {
        //   setErrors((e) => ({
        //     ...e,
        //     team: "Plese assign at least one team to your project",
        //   }));
        // }
    
        //only if there are no errors, send request to create new project
        if (errors.name == "" && errors.description == "" && errors.team == "") {
          const { data, error } = await apiClient.createNewProject({
            name: projectName,
            description: projectDescription,
            teams: teamsToAdd,
            imageUrl: "",
            tickets: [],
          });
    
          // if api request to create a new project was successful: fetchProjects to get updated list of projects, clear all input fields, and setProjectModal to false to exit modal
          if (data) {
            fetchProjects();
            setProjectName("");
            setProjectDescription("");
            setTeamsToAdd([]);
            setProjectModal(false);
            setCurrentProject(data.project);
          } else if (error) {
            setErrors("Something went wrong! Try again.");
          }
      }}else
      {
          const {data, error} = await apiClient.updateProject( projectToEdit.id, {
              name: projectName,
              description: projectDescription,
              teams: teamsToAdd
          })

          if(data)
          {
              setProjectName("");
              setProjectDescription("");
              setProjectModal(false);
              setCurrentProject(data.project)
              setEditing(false);
              setProjectToEdit({})
              fetchProjects()
          }else if(errors)
          {
              setErrors("Something went wrong when updating! Try again.")
          }
      }
    };

    return {
        projectName, 
        setProjectName,
        teamsToAdd, 
        setTeamsToAdd,
        projectDescription,
        setProjectDescription,
        errors,
        setErrors,
        handleOnCreateNewProjectSubmit
    }
}