import React, { useState } from "react";
import {
  makeStyles,
  RadioGroup,
  Radio,
  FormLabel,
  TextField,
  Chip,
  useTheme
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";
import { startAddTicket, startUpdateTicket } from "./actions/tickets";

const useStyles = makeStyles(theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

function TicketForm(props) {
  const [values, setvalues] = useState({
    code: props.ticket ? props.ticket.code : "",
    customer: props.ticket ? props.ticket.customer._id : "",
    department: props.ticket ? props.ticket.department._id : "",
    employees: props.ticket ? props.ticket.employees.map(ele => ele._id) : [],
    message: props.ticket ? props.ticket.message : "",
    priority: props.ticket ? props.ticket.priority : "Low"
  });
  const classes = useStyles();
  const theme = useTheme();
  const handleChange = props => e => {
    setvalues({ ...values, [props]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (props.editing) {
      props.dispatch(
        startUpdateTicket(props.ticket._id, values, props.history)
      );
    } else {
      props.dispatch(startAddTicket(values, props.history));
    }
  };
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Typography variant="h5">
          {props.editing ? "Edit Ticket" : "Ticket Form"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="code">Code</InputLabel>
            <Input
              id="code"
              name="code"
              value={values.code}
              onChange={handleChange("code")}
              autoFocus
            />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="cutomers">Select Customer</InputLabel>
            <Select
              value={values.customer}
              onChange={handleChange("customer")}
              id="cutomers"
            >
              {props.customers.map(ele => (
                <MenuItem key={ele._id} value={ele._id}>
                  {ele.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="department">Select Department</InputLabel>
            <Select
              value={values.department}
              onChange={handleChange("department")}
              id="department"
            >
              {props.departments.map(dep => (
                <MenuItem key={dep._id} value={dep._id}>
                  {dep.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>{" "}
          <FormControl margin="normal" required fullWidth>
            <InputLabel id="demo-mutiple-chip-label">
              Select Employees
            </InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={values.employees}
              onChange={handleChange("employees")}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {values.department &&
                    props.departments
                      .find(ele => ele._id === values.department)
                      .employees.filter(ele => selected.includes(ele._id))
                      .map(value => (
                        <Chip
                          key={value._id}
                          label={value.name}
                          className={classes.chip}
                        />
                      ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {values.department &&
                props.departments
                  .find(ele => ele._id === values.department)
                  .employees.map(emp => (
                    <MenuItem
                      key={emp._id}
                      value={emp._id}
                      style={getStyles(emp.name, values.employees, theme)}
                    >
                      {emp.name}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>{" "}
          <FormControl margin="normal" required fullWidth>
            <FormLabel component="legend">Priority</FormLabel>
            <RadioGroup
              aria-label="prority"
              name="priority"
              value={values.priority}
              onChange={handleChange("priority")}
            >
              <FormControlLabel value="Low" control={<Radio />} label="Low" />
              <FormControlLabel
                value="Medium"
                control={<Radio />}
                label="Medium"
              />
              <FormControlLabel value="High" control={<Radio />} label="High" />
            </RadioGroup>
          </FormControl>{" "}
          <FormControl margin="normal" required fullWidth>
            <TextField
              onChange={handleChange("message")}
              required
              id="outlined-multiline-static"
              label="Message"
              multiline
              rows="4"
              defaultValue={values.message}
              variant="outlined"
            />
          </FormControl>{" "}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="primary"
            className={classes.submit}
          >
            {props.editing ? "Edit Ticket" : "Raise Ticket"}
          </Button>
        </form>
      </Paper>
    </main>
  );
}

const mapStateToProps = (state, props) => {
  return {
    departments: state.departments,
    customers: state.customers,
    ticket: state.tickets.find(ele => ele._id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(TicketForm);
