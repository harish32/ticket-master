import axios from "axios";
import { alert, confirmAlert } from "../alerts";

const setCustomers = customers => {
  return { type: "SET_CUSTOMERS", payload: customers };
};

export const startGetCustomers = () => {
  return async dispatch => {
    const customers = await axios.get("/api/customers", {
      withCredentials: true
    });
    if (customers.data.success) {
      dispatch(setCustomers(customers.data.data));
    } else {
      console.log(customers.data.err);
    }
  };
};

const addCustomer = customer => {
  return { type: "ADD_CUSTOMER", payload: customer };
};

export const startAddCustomer = data => {
  return async dispatch => {
    try {
      const customer = await axios.post("/api/customers", data, {
        withCredentials: true
      });
      if (customer.data.success) {
        dispatch(addCustomer(customer.data.data));
        alert("success", "Yaayy", "customer created successfully");
      }
    } catch (err) {
      alert("error", "Oops...", err.response.data.err);
    }
  };
};

const updateCustomer = (id, customer) => {
  return { type: "UPDATE_CUSTOMER", payload: { customer, id } };
};

export const startEditCustomer = (id, data) => {
  return async dispatch => {
    try {
      const customer = await axios.put(`/api/customers/${id}`, data, {
        withCredentials: true
      });
      if (customer.data.success) {
        dispatch(updateCustomer(id, customer.data.data));
        alert("success", "Yaayy", "updated successfully");
      }
    } catch (err) {
      alert("error", "Oops...", err.response.data.err);
    }
  };
};

const removeCustomer = id => {
  return { type: "REMOVE_CUSTOMER", payload: id };
};

export const startRemoveCustomer = id => {
  return async dispatch => {
    try {
      const confirm = await confirmAlert();
      if (confirm.value) {
        const status = await axios.delete(`/api/customers/${id}`, {
          withCredentials: true
        });
        if (status.data.success) {
          dispatch(removeCustomer(id));
          alert("success", "Yaayy", "deleted Successfully");
        }
      }
    } catch (err) {
      alert("error", "Oops...", err.response.data.err);
    }
  };
};
