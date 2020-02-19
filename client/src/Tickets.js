import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import Ticketstabs from "./Ticketstabs";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  main: {
    width: "auto",
    marginLeft: theme.spacing(15),
    marginTop: theme.spacing(10),
    marginRight: theme.spacing(15)
  },
  title: {
    marginBottom: "3rem"
  }
}));

function Tickets(props) {
  const classes = useStyles();
  if (!props.user.username) {
    return <Redirect to="/user/login" />;
  }
  return (
    <main className={classes.main}>
      <Typography className={classes.title} variant="h3">
        Tickets
      </Typography>
      <Ticketstabs />
    </main>
  );
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(Tickets);
