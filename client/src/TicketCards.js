import React from "react";
import { makeStyles } from "@material-ui/core";
import TicketCard from "./TicketCard";

const useStyles = makeStyles(theme => ({
  cards: {
    marginTop: "3rem",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "2rem"
  }
}));

export default function TicketCards(props) {
  const classes = useStyles();
  return (
    <div className={classes.cards}>
      {props.tickets.map(ele => (
        <TicketCard key={ele._id} {...ele} />
      ))}
    </div>
  );
}
