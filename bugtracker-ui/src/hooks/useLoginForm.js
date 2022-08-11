import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../services/apiClient"
import { useTeamContext } from "../contexts/team";
import { useProjectContext } from "../contexts/project";
import { useStatisticsContext } from "../contexts/statistics";
import { useTicketContext } from "../contexts/ticket";


export const useLoginForm = ({user, setUser}) => {
  const navigate = useNavigate();
  const { fetchTeams } = useTeamContext();
  const { fetchProjects } = useProjectContext();
  const [isLoading, setIsLoading] = useState(false);
  const {fetchAllTickets} = useTicketContext();
  const {fetchDashboardStatistics} = useStatisticsContext();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));
  
      const { data, error } = await apiClient.login({
        email: form.email,
        password: form.password,
      });
      if (data) {
        setUser(data.user);
        apiClient.setToken(data.token);
        fetchTeams();
        fetchProjects();
        fetchDashboardStatistics();
        fetchAllTickets();
      }
      if (error) {
        setErrors((e) => ({ ...e, form: error }));
      }
      setIsLoading(false);
    };

    return {
      form, 
      errors, 
      isLoading, 
      handleOnInputChange, 
      handleOnSubmit
    }
}