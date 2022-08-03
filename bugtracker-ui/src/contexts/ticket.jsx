import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const TicketContext = createContext(null);

// context to keep track of a users tickets, the current ticket selected, and whether or not the ticketModal should be displayed.
export const TicketContextProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [ticketModal, setTicketModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({});
  //const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // const fetchTicketsForProject = async (projectId) => {
  //   setIsLoading(true);
  //   setError(null);
  //   const { data, error } = await apiClient.listAllProjectTickets(projectId);
  //   if (data) {
  //     setTickets(data.ticketList);
  //   }
  //   if (error) {
  //     setError(error);
  //   }
  //   setIsLoading(false);
  // };

  const fetchAllTickets = async () => {
    //setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.listAllTickets();
    if (data) {
      setTickets(data.ticketList);
    }
    if (error) {
      setError(error);
    }
    //setIsLoading(false);
  };

  useEffect(() => {
    fetchAllTickets();
  }, [setTickets]);

  const ticketValue = {
    tickets,
    setTickets,
    currentTicket,
    setCurrentTicket,
    fetchAllTickets,
    ticketModal,
    setTicketModal,
  };

  return (
    <TicketContext.Provider value={ticketValue}>
      <>{children}</>
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => useContext(TicketContext);
