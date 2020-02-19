import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "./Modal";
import { connect } from "react-redux";
import {
  startAddDepartment,
  startEditDepartment,
  startRemoveDepartment
} from "./actions/departments";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 700
  },
  list: {
    marginTop: theme.spacing(5)
  },
  userrow: {
    cursor: "pointer"
  },
  add: {
    marginTop: theme.spacing(5)
  }
}));

function CustomizedTables(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dialog, setdialog] = React.useState(false);
  const [form, setform] = React.useState({});

  useEffect(() => {
    if (form.type) {
      setdialog(true);
    }
  }, [form]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setdialog(false);
  };
  const handleAddDepartment = () => {
    setform({
      type: "ADD DEPARTMENT",
      id: "",
      data: { name: "" }
    });
  };
  const handleSubmitForm = () => {
    if (form.id) {
      props.dispatch(startEditDepartment(form.id, form.data));
    } else {
      props.dispatch(startAddDepartment(form.data));
    }
    handleClose();
  };
  const handleformChange = props => e => {
    setform({
      ...form,
      data: { ...form.data, [props]: e.target.value }
    });
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleEdit = props => e => {
    e.stopPropagation();
    const { _id, name } = props;
    setform({ type: "Edit", id: _id, data: { name } });
  };
  const handleUserclick = (e, value) => {
    e.stopPropagation();
    props.history.push(`/departments/${value}`);
  };
  const handleRemove = (e, id) => {
    e.stopPropagation();
    props.dispatch(startRemoveDepartment(id));
  };

  const classes = useStyles();
  const { departments } = props;
  return (
    <>
      <TableContainer component={Paper} className={classes.list}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Total Employees</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Remove </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments &&
              departments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <StyledTableRow
                    hover
                    onClick={e => {
                      handleUserclick(e, row._id);
                    }}
                    className={classes.userrow}
                    key={row._id}
                  >
                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.employees.length}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <EditIcon onClick={handleEdit(row)} />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        color="secondary"
                        onClick={e => handleRemove(e, row._id)}
                        variant="outlined"
                      >
                        remove
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={departments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      {dialog && (
        <Modal
          handleSubmit={handleSubmitForm}
          handleClose={handleClose}
          handleChange={handleformChange}
          data={form}
          open={dialog}
        />
      )}
      <Button className={classes.add} onClick={handleAddDepartment}>
        add Department
      </Button>
    </>
  );
}

const mapStateToProps = state => {
  return {
    departments: state.departments
  };
};

export default connect(mapStateToProps)(CustomizedTables);
