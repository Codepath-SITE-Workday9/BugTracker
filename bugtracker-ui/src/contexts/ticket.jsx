import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useProjectContext } from "./project";

const TicketContext = createContext(null);

// context to keep track of a users tickets, the current ticket selected, and whether or not the ticketModal should be displayed.
export const TicketContextProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [ticketModal, setTicketModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({});
  const [ticketToEdit, setTicketToEdit] = useState({});
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("All priorities");
  const [selectedStatus, setSelectedStatus] = useState("All statuses");
  const [selectedCategory, setSelectedCategory] = useState("All categories");

  //the selected project from the dropdown menu - will be the id of the project (-1 if all projects is selected)
  const [selectedProject, setSelectedProject] = useState(-1);

  const { projects, fetchProjects } = useProjectContext();

  const fetchAllTickets = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.listAllTickets();
    if (data) {
      setTickets(data.ticketList);
      if (
        data.ticketList.length > 0 &&
        Object.keys(currentTicket).length == 0
      ) {
        setCurrentTicket(data.ticketList[0]);
        fetchProjects();
        setSelectedProject(projects[0].id);
      }
      // setFilteredTickets(data.ticketList);
      // filterByCategory();
      // filterByStatus();
      // filteryByPriority();
    }
    if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  // useEffect to fetch tickets on initial load
  useEffect(() => {
    fetchAllTickets();
  }, []);

  // useEffect(() => {
  //   if(selectedProject == -1){

  //   }
  //   if (!selectedCategory.includes("All")) {
  //     const results = filteredTickets?.filter((t) =>
  //       t.category.toLowerCase().includes(selectedCategory.toLowerCase())
  //     );
  //     setFilteredTickets(results);
  //   }

  //   if (!selectedPriority.includes("All")) {
  //     const results = filteredTickets?.filter((t) =>
  //       t.priority.toLowerCase().includes(selectedPriority.toLowerCase())
  //     );
  //     setFilteredTickets(results);
  //   }

  //   if (!selectedStatus.includes("All")) {
  //     const results = filteredTickets?.filter((t) =>
  //       t.status.toLowerCase().includes(selectedStatus.toLowerCase())
  //     );
  //     setFilteredTickets(results);
  //   }
  // }, [selectedCategory, selectedStatus, selectedPriority, selectedProject]);

  const clearTicketContext = () => {
    setTickets([]);
    setFilteredTickets([]);
    setTicketModal(false);
    setCurrentTicket({});
    setTicketToEdit({});
    setEditing(false);
    setIsLoading(false);
    setError("");
  };

  const ticketValue = {
    tickets,
    setTickets,
    currentTicket,
    setCurrentTicket,
    editing,
    setEditing,
    fetchAllTickets,
    ticketModal,
    setTicketModal,
    isLoading,
    ticketToEdit,
    setTicketToEdit,
    setSelectedProject,
    selectedProject,
    clearTicketContext,
    selectedPriority,
    setSelectedPriority,
    selectedStatus,
    setSelectedStatus,
    selectedCategory,
    setSelectedCategory,
    filteredTickets,
    setFilteredTickets,
  };

  return (
    <TicketContext.Provider value={ticketValue}>
      <>{children}</>
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => useContext(TicketContext);
