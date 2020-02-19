import React from "react";
import { Typography, Paper, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import TicketCards from "./TicketCards";

const useStyles = makeStyles(theme => ({
  page: {
    margin: theme.spacing(20),
    textAlign: "center"
  }
}));

function CustomerInfo(props) {
  const classes = useStyles();
  if (!props.customer || !props.tickets) {
    return <div></div>;
  } else {
    return (
      <main className={classes.page}>
        <Paper>
          <Typography m={2} variant="h5" gutterBottom>
            {props.customer.name}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {props.customer.email}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {props.customer.mobile}
          </Typography>
          <TicketCards tickets={props.tickets} />
        </Paper>
      </main>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    tickets: state.tickets.filter(
      ele => ele.customer._id === props.match.params.id
    ),
    customer: state.customers.find(ele => ele._id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(CustomerInfo);
