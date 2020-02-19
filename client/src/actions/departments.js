import axios from "axios";
import { alert, confirmAlert } from "../alerts";

const setDepartments = departments => {
  return { type: "SET_DEPARTMENTS", payload: departments };
};

export const startGetDepartments = () => {
  return async dispatch => {
    const departments = await axios.get("/api/departments", {
      withCredentials: true
    });
    if (departments.data.success) {
      dispatch(setDepartments(departments.data.data));
    }
  };
};

const addDepartment = department => {
  console.log(department);
  return { type: "ADD_DEPARTMENT", payload: department };
};

export const startAddDepartment = data => {
  return async dispatch => {
    try {
      const department = await axios.post("/api/departments", data, {
        withCredentials: true
      });
      if (department.data.success) {
        dispatch(addDepartment(department.data.data));
        alert("success", "Coool", "department added successfully");
      }
    } catch (err) {
      alert("error", "Oops..", err.response.data.err);
    }
  };
};

const editDepartment = (name, id) => {
  return { type: "UPDATE_DEPARTMENT", payload: { id, name } };
};

export const startEditDepartment = (id, data) => {
  return async dispatch => {
    try {
      const department = await axios.put(`/api/departments/${id}`, data, {
        withCredentials: true
      });
      if (department.data.success) {
        dispatch(editDepartment(data.name, id));
        alert("success", "Yaayy", "edited successfully");
      }
    } catch (err) {
      alert("error", "Oops..", err.response.data.err);
    }
  };
};

const removeDepartment = id => {
  return { type: "REMOVE_DEPARTMENT", payload: id };
};

export const startRemoveDepartment = id => {
  return async dispatch => {
    try {
      const confirm = await confirmAlert();
      if (confirm.value) {
        const department = await axios.delete(`/api/departments/${id}`, {
          withCredentials: true
        });
        if (department.data.success) {
          dispatch(removeDepartment(id));
          alert("success", "Deleted", "deleted successfully");
        }
      }
    } catch (err) {
      alert("error", "Oops..", err.response.data.err);
    }
  };
};
