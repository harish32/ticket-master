import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import Customers from "./Customers";
import Departments from "./Departments";
import ShowDepartment from "./ShowDepartment";
import Tickets from "./Tickets";
import TicketForm from "./TicketForm";
import CustomerInfo from "./CustomerInfo";
import { connect } from "react-redux";

function App(props) {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Dashboard />} />
        <Route
          exact
          path="/user/register"
          render={router => <Register {...router} />}
        />
        <Route
          exact
          path="/user/login"
          render={router => <Login {...router} />}
        />
        <Route
          exact
          path="/user/logout"
          render={router => <Logout {...router} />}
        />
        <Route
          exact
          path="/customers"
          render={router => <Customers {...router} />}
        />
        <Route
          exact
          path="/customers/:id/info"
          render={props => <CustomerInfo {...props} />}
        />
        <Route
          exact
          path="/departments"
          render={router => <Departments {...router} />}
        />
        <Route
          exact
          path="/departments/:id"
          render={props => <ShowDepartment {...props} />}
        />
        <Route exact path="/tickets" render={() => <Tickets {...props} />} />
        <Route
          exact
          path="/tickets/new"
          render={props => <TicketForm {...props} />}
        />
        <Route
          exact
          path="/tickets/:id/edit"
          render={props => <TicketForm {...props} editing={true} />}
        />
      </Switch>
    </>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(App);
