import React from "react";
import { connect } from "react-redux";
import { startLogout } from "./actions/user";

function Logout(props) {
  props.dispatch(startLogout(props.history));
  return <div></div>;
}

export default connect()(Logout);
