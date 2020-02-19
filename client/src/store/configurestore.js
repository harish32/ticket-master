import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "../reducers/userReducer";
import alertReducer from "../reducers/alertReducer";
import departmentsReducer from "../reducers/departmentReducer";
import customersReducer from "../reducers/customersReducer";
import ticketsReducer from "../reducers/ticketsReducer";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      alert: alertReducer,
      departments: departmentsReducer,
      customers: customersReducer,
      tickets: ticketsReducer
    }),
    applyMiddleware(thunk)
  );
  return store;
};

export default configureStore;
