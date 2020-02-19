import React from "react";
import PriorityChart from "./charts/PriorityCharts";
import { makeStyles } from "@material-ui/core";
import DepartmentChart from "./charts/DepartmentChart";

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(5),
    display: "flex"
  }
}));

function Charts(props) {
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <PriorityChart />
      <DepartmentChart />
    </main>
  );
}

export default Charts;
