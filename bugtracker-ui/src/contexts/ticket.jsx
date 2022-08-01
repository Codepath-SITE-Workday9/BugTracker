import { createContext, useContext, useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const TicketContext = createContext(null);

export const TicketContextProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [ticketModal, setTicketModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error } = await apiClient.listAllTickets();
    if (data) {
      setTickets(data.ticketList);
    }
    if (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTickets();
  }, [setTickets]);

  const ticketValue = {
    tickets,
    setTickets,
    currentTicket,
    setCurrentTicket,
    fetchTickets,
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
