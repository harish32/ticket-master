import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: props => ({
    minWidth: 275,
    marginBottom: "2rem",
    color: props.priority === "High" ? "white" : "black",
    backgroundColor:
      props.priority === "High"
        ? "#eb4034"
        : props.priority === "Medium"
        ? "#ebd634"
        : "#34ebba"
    // color: props.priority === "Low" && "black",
    // backgroundColor: props.priority === "Low" && "#34ebba"
  }),
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 12
  }
});

export default function OutlinedCard(props) {
  const classes = useStyles(props);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {props.code}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.priority}
        </Typography>
        <Typography className={classes.pos}>{props.message}</Typography>
        <Typography variant="h6">
          {props.employees.map(ele => ele.name).join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
}
