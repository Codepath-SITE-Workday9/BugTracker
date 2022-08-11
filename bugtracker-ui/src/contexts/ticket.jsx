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
  const [showResolvedTickets, setShowResolvedTickets] = useState(false);

  //the selected project from the dropdown menu - will be the id of the project (-1 if all projects is selected)
  const [selectedProject, setSelectedProject] = useState(-1);

  // tickets to show based on selected project - initially set to all tickets
  const [selectedProjectTickets, setSelectedProjectTickets] = useState(tickets);

  const { fetchProjects } = useProjectContext();

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
      }

      const filterMethods = [
        // filter by project
        (t) => t.project_id == selectedProject || selectedProject == -1,
        // filter by category
        (t) =>
          t.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          selectedCategory.includes("All"),
        //filter by priority
        (t) =>
          t.priority.toLowerCase().includes(selectedPriority.toLowerCase()) ||
          selectedPriority.includes("All"),
        // filter by status
        (t) =>
          t.status.toLowerCase().includes(selectedStatus.toLowerCase()) ||
          selectedStatus.includes("All"),
        // filter based on if myFilterOnly is checked or not
        (t) => (myTicketsOnly ? t.creator_id == user.id : true),
        // filter based on if showResolvedTickets is checked or not
        (t) =>
          showResolvedTickets
            ? t.status.toLowerCase().includes("resolved")
            : !t.status.toLowerCase().includes("resolved"),
      ];

      const filteredArray = data.ticketList.filter((t) => {
        for (let i = 0; i < filterMethods.length; i++) {
          if (!filterMethods[i](t)) {
            return false;
          }
        }
        return true;
      });
      setSelectedProjectTickets(filteredArray);
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

  // useEffect to fetch tickets whenever a filter changes
  useEffect(() => {
    fetchAllTickets();
  }, [
    selectedCategory,
    selectedStatus,
    selectedPriority,
    selectedProject,
    myTicketsOnly,
    showResolvedTickets,
  ]);

  // function to select the tickets for a specifc project given the project's id
  // if the projId < 0, that means All Projects has been selected -> set tickets to all tickets
  const fetchProjectTickets = () => {
    if (selectedProject < 0) {
      setSelectedProjectTickets();
    } else {
      setSelectedProjectTickets(
        tickets.filter((t) => t.project_id == selectedProject)
      );
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
    setSelectedStatus("All statuses");
    setSelectedCategory("All categories");
    setSelectedPriority("All priorities");
    setMyTicketsOnly(true);
    setShowResolvedTickets(false);
    setSelectedProject(-1);
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
    showResolvedTickets,
    setShowResolvedTickets,
  };

  return (
    <TicketContext.Provider value={ticketValue}>
      <>{children}</>
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => useContext(TicketContext);
