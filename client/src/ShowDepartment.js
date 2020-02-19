import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles, Typography, IconButton } from "@material-ui/core";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import Modal from "./Modal";
import {
  startAddEmployee,
  startEditEmployee,
  startRemoveEmployee
} from "./actions/employees";
import EmployeeCard from "./EmployeeCard";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(theme => ({
  main: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(10),
    marginRight: theme.spacing(10),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  listing: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  add: {
    width: "16rem",
    marginLeft: "2rem",
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

function ShowDepartment(props) {
  const classes = useStyles();
  const [dialog, setdialog] = React.useState(false);
  const [form, setform] = React.useState({});
  useEffect(() => {
    if (form.type) {
      setdialog(true);
    }
  }, [form]);
  const handleSubmitForm = () => {
    if (form.id) {
      props.dispatch(
        startEditEmployee(form.id, {
          ...form.data,
          department: props.match.params.id
        })
      );
    } else {
      props.dispatch(
        startAddEmployee({ ...form.data, department: props.match.params.id })
      );
    }
    handleClose();
  };
  const handleClose = () => {
    setdialog(false);
  };
  const handleformChange = props => e => {
    if (props === "image") {
      setform({
        ...form,
        data: { ...form.data, [props]: e.target.files[0] }
      });
    } else {
      setform({
        ...form,
        data: { ...form.data, [props]: e.target.value }
      });
    }
  };
  const handleAddEmployee = () => {
    setform({
      type: "ADD_EMPLOYEE",
      data: { name: "", email: "", mobile: "", image: null }
    });
  };
  const handleEditEmployee = id => {
    const employee = props.department.employees.find(ele => ele._id === id);

    setform({
      type: "EDIT EMPLOYEE",
      id: employee._id,
      data: {
        name: employee.name,
        email: employee.email,
        mobile: employee.mobile,
        image: null
      }
    });
  };
  const handleRemoveEmployee = id => {
    console.log(id, props.match.params.id);
    props.dispatch(startRemoveEmployee(props.match.params.id, id));
  };
  if (!props.department) {
    return <div></div>;
  } else {
    return (
      <div className={classes.main}>
        <Typography variant="h4">{props.department.name}</Typography>
        {dialog && (
          <Modal
            handleSubmit={handleSubmitForm}
            handleClose={handleClose}
            handleChange={handleformChange}
            data={form}
            open={dialog}
          />
        )}
        <div className={classes.listing}>
          {props.department.employees.map(ele => (
            <EmployeeCard
              {...ele}
              handleEdit={handleEditEmployee}
              handleRemove={handleRemoveEmployee}
            />
          ))}
          <Card className={classes.add}>
            <IconButton aria-label="add" onClick={handleAddEmployee}>
              <ControlPointIcon style={{ fontSize: 100 }} />
            </IconButton>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    department: state.departments.find(ele => ele._id === props.match.params.id)
  };
};

export default connect(mapStateToProps)(ShowDepartment);
