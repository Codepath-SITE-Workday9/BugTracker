import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../services/apiClient"
import { useTeamContext } from "../contexts/team";


export const useLoginForm = ({user, setUser}) => {
  const navigate = useNavigate();
  const { fetchTeams } = useTeamContext();
  const [isLoading, setIsLoading] = useState(false);
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