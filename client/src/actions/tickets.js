import axios from "axios";
import { alert, confirmAlert } from "../alerts";

const setTickets = tickets => {
  return { type: "SET_TICKETS", payload: tickets };
};

export const startGetTickets = () => {
  return async dispatch => {
    const tickets = await axios.get("/api/tickets", { withCredentials: true });
    if (tickets.data.success) {
      dispatch(setTickets(tickets.data.data));
    }
  };
};

const addTicket = ticket => {
  return { type: "ADD_TICKET", payload: ticket };
};

export const startAddTicket = (data, history) => {
  return async dispatch => {
    try {
      const ticket = await axios.post("/api/tickets", data, {
        withCredentials: true
      });
      if (ticket.data.success) {
        dispatch(addTicket(ticket.data.data));
        history.push("/tickets");
        alert("success", "Yaayy", "ticket created successfully");
      }
    } catch (err) {
      alert("error", "Oops..", err.response.data.err);
    }
  };
};

const updateTicket = (id, ticket) => {
  return { type: "EDIT_TICKET", payload: { id, ticket } };
};

export const startUpdateTicket = (id, data, history) => {
  return async dispatch => {
    try {
      const ticket = await axios.put(`/api/tickets/${id}`, data, {
        withCredentials: true
      });
      if (ticket.data.success) {
        dispatch(updateTicket(id, ticket.data.data));
        alert("success", "Yaayy", "ticket updated successfully");
        history.push("/tickets");
      }
    } catch (err) {
      alert("error", "Oops..", err.response.data.err);
    }
  };
};

const deleteTicket = id => {
  return { type: "DELETE_TICKET", payload: id };
};

export const startDeleteTicket = id => {
  return async dispatch => {
    try {
      const confirm = await confirmAlert();
      if (confirm.value) {
        const ticket = await axios.delete(`/api/tickets/${id}`, {
          withCredentials: true
        });
        if (ticket.data.success) {
          dispatch(deleteTicket(id));
        }
      }
    } catch (err) {
      alert("error", "Oops..", err.response.data.err);
    }
  };
};

const resolveTicket = (id, status) => {
  return { type: "RESOLVE_TICKET", payload: { id, status } };
};

export const startResolveTicket = (id, data) => {
  return async dispatch => {
    const ticket = await axios.put(`/api/tickets/${id}/resolve`, data, {
      withCredentials: true
    });
    if (ticket.data.success) {
      dispatch(resolveTicket(id, ticket.data.data));
      alert("success", "Yayy", "ticket resolved successfully");
    }
  };
};
