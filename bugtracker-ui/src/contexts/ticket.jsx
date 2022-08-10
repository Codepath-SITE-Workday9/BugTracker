import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { useProjectContext } from "./project";
import { useAuthContext } from "./auth";
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
  const [myTicketsOnly, setMyTicketsOnly] = useState(true);

  //the selected project from the dropdown menu - will be the id of the project (-1 if all projects is selected)
  const [selectedProject, setSelectedProject] = useState(-1);

  // tickets to show based on selected project - initially set to all tickets
  const [selectedProjectTickets, setSelectedProjectTickets] = useState(tickets);

  const { projects, fetchProjects } = useProjectContext();

  const { user } = useAuthContext();

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
        if (projects.length > 0) {
          setSelectedProject(projects[0].id);
        }
      }

      if (selectedProject < 0) {
        setSelectedProjectTickets(data.ticketList);
      } else {
        setSelectedProjectTickets(
          data.ticketList.filter((t) => t.project_id == selectedProject)
        );
      }
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

  useEffect(() => {
    fetchAllTickets();
    filterByCategory();
    filterByPriority();
    filterByStatus();
    showMyTicketsOnly();
  }, [
    selectedCategory,
    selectedStatus,
    selectedPriority,
    selectedProject,
    myTicketsOnly,
  ]);

  // function to select the tickets for a specifc project given the project's id
  // if the projId < 0, that means All Projects has been selected -> set tickets to all tickets
  const fetchProjectTickets = () => {
    if (selectedProject < 0) {
      setSelectedProjectTickets(tickets);
    } else {
      setSelectedProjectTickets(
        tickets.filter((t) => t.project_id == selectedProject)
      );
    }
  };

  const filterByCategory = () => {
    if (!selectedCategory.includes("All")) {
      const results = selectedProjectTickets?.filter((t) =>
        t.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
      setSelectedProjectTickets(results);
    }
  };

  const filterByStatus = () => {
    if (!selectedStatus.includes("All")) {
      const results = selectedProjectTickets?.filter((t) =>
        t.status.toLowerCase().includes(selectedStatus.toLowerCase())
      );
      setSelectedProjectTickets(results);
    }
  };

  const filterByPriority = () => {
    if (!selectedPriority.includes("All")) {
      const results = selectedProjectTickets?.filter((t) =>
        t.priority.toLowerCase().includes(selectedPriority.toLowerCase())
      );
      setSelectedProjectTickets(results);
    }
  };

  const showMyTicketsOnly = () => {
    if (myTicketsOnly) {
      const results = selectedProjectTickets?.filter(
        (t) => t.creator_id == user.id
      );
      setSelectedProjectTickets(results);
    }
  };

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
    setSelectedProjectTickets,
    selectedProjectTickets,
    fetchProjectTickets,
    myTicketsOnly,
    setMyTicketsOnly,
  };

  return (
    <TicketContext.Provider value={ticketValue}>
      <>{children}</>
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => useContext(TicketContext);
