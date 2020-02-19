import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { CardActions } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "16rem",
    marginLeft: "2rem",
    marginTop: "2rem",
    position: "relative",
    // cursor: "pointer",
    "&:hover div": {
      opacity: 1
    }
  },
  media: {
    height: 0,
    paddingTop: "76.25%" // 16:9
  },
  small: {
    fontWeight: 100,
    fontSize: "1rem"
  },
  action: {
    zIndex: 10
  },
  actions: {
    position: "absolute",
    background: "transparent",
    top: "-1.3rem",
    right: "-1.8rem",
    opacity: 0
  }
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.actions}
        action={
          <CardActions>
            <IconButton aria-label="edit">
              <EditIcon onClick={() => props.handleEdit(props._id)} />
            </IconButton>

            <IconButton aria-label="settings">
              <DeleteIcon onClick={() => props.handleRemove(props._id)} />
            </IconButton>
          </CardActions>
        }
      />
      {/* <CardActions className={classes.action}>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>

            <IconButton aria-label="settings">
              <DeleteIcon />
            </IconButton>
          </CardActions> */}
      <CardMedia className={classes.media} image={props.image.img_url} />
      <CardContent>
        <Typography variant="h6">
          Email :<span className={classes.small}>{props.email}</span>
        </Typography>
        <Typography variant="h6">
          Mobile :<span className={classes.small}>{props.mobile}</span>
        </Typography>
        <Typography variant="h6">
          Name :<span className={classes.small}>{props.name}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}
