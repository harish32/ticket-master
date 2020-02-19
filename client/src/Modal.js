import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  dialog: {
    display: "flex",
    flexDirection: "column"
  }
}));

export default function FormDialog(props) {
  const { handleClose, open, data, handleChange, handleSubmit } = props;
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">{data.type}</DialogTitle>
      <DialogContent className={classes.dialog}>
        {Object.keys(data.data).map(ele => {
          if (ele === "image") {
            return (
              // <FormControl key={Number(Date.now())}>
              //   <InputLabel htmlFor={ele}>Image</InputLabel>
              //   <Input
              //     required
              //     key={ele}
              //     autoFocus
              //     margin="dense"
              //     id={ele}
              //     label={ele}
              //     type="file"
              //     onChange={handleChange(ele)}
              //   />
              // </FormControl>
              <TextField
                required
                key={ele}
                autoFocus
                margin="dense"
                id={ele}
                label={ele}
                type="file"
                onChange={handleChange(ele)}
              />
            );
          }
          return (
            <TextField
              required
              key={ele}
              autoFocus
              margin="dense"
              id={ele}
              value={data.data[ele]}
              label={ele}
              type="text"
              onChange={handleChange(ele)}
            />
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
