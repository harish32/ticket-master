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
  startAddCustomer,
  startEditCustomer,
  startRemoveCustomer
} from "./actions/customers";

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
  const handleAddUser = () => {
    setform({
      type: "ADD_CUSTOMER",
      id: "",
      data: { email: "", name: "", mobile: "" }
    });
  };
  const handleSubmitForm = () => {
    if (form.id) {
      props.dispatch(startEditCustomer(form.id, form.data));
    } else {
      props.dispatch(startAddCustomer(form.data));
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
    const { email, _id, mobile, name } = props;
    setform({ type: "Edit", id: _id, data: { email, mobile, name } });
  };
  const handleUserclick = (e, value) => {
    e.stopPropagation();
    props.history.push(`/customers/${value}/info`);
  };
  const handleRemove = (e, id) => {
    e.stopPropagation();
    props.dispatch(startRemoveCustomer(id));
  };
  const classes = useStyles();
  const { customers } = props;
  return (
    <>
      <TableContainer component={Paper} className={classes.list}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Mobile</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Remove </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers &&
              customers
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
                      {row.email}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.mobile}
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
          count={customers.length}
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
      <Button className={classes.add} onClick={handleAddUser}>
        add customer
      </Button>
    </>
  );
}

const mapStateToProps = state => {
  return {
    customers: state.customers
  };
};

export default connect(mapStateToProps)(CustomizedTables);
