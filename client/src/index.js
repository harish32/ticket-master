import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "./store/configurestore";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { setUser } from "./actions/user";
import { startGetCustomers } from "./actions/customers";
import { startGetDepartments } from "./actions/departments";
import { startGetTickets } from "./actions/tickets";

const store = configureStore();

store.subscribe(() => {
  console.log(store.getState());
});

const getUser = async () => {
  const user = await axios.get("/api/user/getuser", {
    withCredentials: true
  });
  if (user.data.success) {
    store.dispatch(setUser(user.data.data));
    store.dispatch(startGetDepartments());
    store.dispatch(startGetCustomers());
    store.dispatch(startGetTickets());
  }
};

getUser();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
