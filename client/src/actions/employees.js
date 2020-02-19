import axios from "axios";
import { alert, confirmAlert } from "../alerts";

const addEmployee = (id, employee) => {
  return { type: "ADD_EMPLOYEE", payload: { id, employee } };
};

export const startAddEmployee = data => {
  const fdata = new FormData();
  fdata.append("file", data.image);
  fdata.append("name", data.name);
  fdata.append("email", data.email);
  fdata.append("mobile", data.mobile);
  fdata.append("departmentId", data.department);
  return async dispatch => {
    try {
      const employee = await axios.post("/employees", fdata, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (employee.data.success) {
        dispatch(addEmployee(data.department, employee.data.data));
        alert("success", "Yaayy", "employee added successfully");
      }
    } catch (err) {
      alert("error", "Oops..", err.response.data.err);
    }
  };
};

const editEmployee = (depid, empid, employee) => {
  return { type: "UPDATE_EMPLOYEE", payload: { depid, empid, employee } };
};

export const startEditEmployee = (id, data) => {
  const fdata = new FormData();
  fdata.append("file", data.image);
  fdata.append("name", data.name);
  fdata.append("email", data.email);
  fdata.append("mobile", data.mobile);
  fdata.append("departmentId", data.department);
  return async dispatch => {
    try {
      const employee = await axios.put(`/employees/${id}`, fdata, {
        withCredentials: true
      });
      if (employee.data.success) {
        dispatch(editEmployee(data.department, id, employee.data.data));
        alert("success", "Yaayy", "employee updated successfully");
      }
    } catch (err) {
      alert("error", "Oops..", err.response.data.err);
    }
  };
};

const removeEmployee = (depid, empid) => {
  return { type: "REMOVE_EMPLOYEE", payload: { depid, empid } };
};

export const startRemoveEmployee = (depid, empid) => {
  return async dispatch => {
    try {
      const confirm = await confirmAlert();
      if (confirm.value) {
        const employee = await axios.delete(`/employees/${empid}`, {
          withCredentials: true
        });
        if (employee.data.success) {
          dispatch(removeEmployee(depid, empid));
          alert("success", "Deleted", "deleted successfully");
        }
      }
    } catch (err) {
      alert("error", "Oops..", err.response.data.err);
    }
  };
};
