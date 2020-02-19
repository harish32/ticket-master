import axios from "axios";
import { startGetDepartments } from "./departments";
import { startGetCustomers } from "./customers";
import { startGetTickets } from "./tickets";
import { alert, confirmAlert } from "../alerts";

export const setUser = user => {
  return { type: "SET_USER", payload: user };
};

export const removeUser = () => {
  return { type: "REMOVE_USER" };
};

export const startRegister = (data, history) => {
  return async dispatch => {
    try {
      const user = await axios.post(
        "http://localhost:8000/user/register",
        data,
        { withCredentials: true }
      );
      if (user.data.success) {
        alert("success", "Registered successfully", "welcome to ticket master");
        dispatch(setUser(user.data.data));
        dispatch(startGetCustomers());
        dispatch(startGetDepartments());
        dispatch(startGetTickets());
        history.push("/");
      }
    } catch (err) {
      alert("error", "Oops..", err.response.data.err);
    }
  };
};

export const startLogin = (data, history) => {
  return async dispatch => {
    try {
      const user = await axios.post("/user/login", data, {
        withCredentials: true
      });
      if (user.data.success) {
        alert("success", `Welcome back ${user.data.data.username}`, "");
        dispatch(setUser(user.data.data));
        dispatch(startGetCustomers());
        dispatch(startGetDepartments());
        dispatch(startGetTickets());
        history.push("/");
      }
    } catch (err) {
      alert("error", "Oops..", err.response.data.err);
    }
  };
};

export const startLogout = history => {
  return async dispatch => {
    try {
      const user = await axios.get("http://localhost:8000/user/logout", {
        withCredentials: true
      });
      if (user.data.success) {
        dispatch(removeUser());
        alert(
          "success",
          "Logged out successfully",
          "waiting for you to login again"
        );
        history.push("/");
      }
    } catch (err) {
      alert("error", "Oops..", "something went wrong");
    }
  };
};

export const addCustomer = customer => {
  return { type: "ADD_CUSTOMER", payload: customer };
};

export const startAddCustomer = data => {
  return async dispatch => {
    const user = await axios.post("http://localhost:8000/customers", data, {
      withCredentials: true
    });
    console.log(user);
    if (user.data.success) {
      dispatch(addCustomer(user.data.data));
    }
  };
};

const editCustomer = (id, customer) => {
  return { type: "EDIT_CUSTOMER", payload: { id, customer } };
};

export const startEditCustomer = (id, customer) => {
  return async dispatch => {
    const editedCustomer = await axios.put(
      `http://localhost:8000/customers/${id}`,
      customer,
      { withCredentials: true }
    );
    if (editedCustomer.data.success) {
      dispatch(editCustomer(id, editedCustomer.data.data));
    }
  };
};

const removeCustomer = id => {
  return { type: "REMOVE_CUSTOMER", payload: id };
};

export const startRemoveCustomer = id => {
  return async dispatch => {
    const status = await axios.delete(`http://localhost:8000/customers/${id}`, {
      withCredentials: true
    });
    // console.log()
    if (status.data.success) {
      dispatch(removeCustomer(id));
    }
  };
};
