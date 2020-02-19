import React from "react";
import { makeStyles } from "@material-ui/core";
import dash from "./dash.png";

const styles = makeStyles(theme => ({
  mainImg: {
    display: "flex",
    justifyContent: "center"
  },
  title: {
    fontWeight: 100,
    fontSize: "2rem"
  }
}));

export default function Dashboard() {
  const classes = styles();
  return (
    <div className={classes.mainImg}>
      <div>
        <p className={classes.title}>welcome to ticket master app</p>
        <img src={dash} alt="mainimage" />
      </div>
    </div>
  );
}
