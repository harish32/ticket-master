import React from "react";
import ListingCustomers from "./ListingCustomers";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  main: {
    width: "auto",
    marginLeft: theme.spacing(20),
    marginTop: theme.spacing(10),
    marginRight: theme.spacing(20)
  }
}));

function Customers(props) {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <Typography variant="h3">Customers</Typography>
      <ListingCustomers history={props.history} />
    </main>
  );
}

export default Customers;
