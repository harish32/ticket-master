import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import ListingDepartments from "./ListingDepartments";

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(25),
    marginRight: theme.spacing(20)
  }
}));

export default function Departments(props) {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <Typography variant="h4">Departments</Typography>
      <ListingDepartments history={props.history} />
    </main>
  );
}
