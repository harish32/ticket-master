import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import {
  Button,
  FormControlLabel,
  Checkbox,
  Typography
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { startDeleteTicket, startResolveTicket } from "./actions/tickets";
import Charts from "./Charts";

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
  },
  charts: {
    marginTop: "5rem",
    textAlign: "center"
  }
}));

function CustomizedTables(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleEdit = (e, id) => {
    e.stopPropagation();
    props.history.push(`/tickets/${id}/edit`);
  };
  const handleRemove = (e, id) => {
    e.stopPropagation();
    props.dispatch(startDeleteTicket(id));
  };
  const handleAddTicket = () => {
    props.history.push("/tickets/new");
  };
  const handleResolve = (id, status) => {
    props.dispatch(startResolveTicket(id, { isDone: !status }));
  };
  const classes = useStyles();
  const { tickets } = props;
  return (
    <>
      <TableContainer component={Paper} className={classes.list}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Code No</StyledTableCell>
              <StyledTableCell align="center">Customer</StyledTableCell>
              <StyledTableCell align="center">Department</StyledTableCell>
              <StyledTableCell align="center">Employee</StyledTableCell>
              <StyledTableCell align="center">Message</StyledTableCell>
              <StyledTableCell align="center">Priority</StyledTableCell>
              <StyledTableCell align="center">Edit</StyledTableCell>
              <StyledTableCell align="center">Remove</StyledTableCell>
              <StyledTableCell align="center">Complete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets &&
              tickets
                .filter(ele => ele.isDone === props.completed)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => (
                  <StyledTableRow
                    hover
                    // onClick={e => {
                    //   handleUserclick(e, row.id);
                    // }}
                    className={classes.userrow}
                    key={row._id}
                  >
                    <StyledTableCell align="center">{row.code}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.customer.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.department.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.employees.map(ele => ele.name).join(", ")}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.message}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.priority}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <EditIcon onClick={e => handleEdit(e, row._id)} />
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
                    <StyledTableCell align="center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={row.isDone}
                            onChange={() => handleResolve(row._id, row.isDone)}
                            value={row.isDone}
                          />
                        }
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={
            props.completed
              ? tickets.filter(ele => ele.isDone).length
              : tickets.filter(ele => !ele.isDone).length
          }
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      {!props.completed && (
        <Button className={classes.add} onClick={handleAddTicket}>
          add ticket
        </Button>
      )}
      <div className={classes.charts}>
        <Typography variant="h5">Analytics</Typography>
        <Charts />
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets
  };
};

export default connect(mapStateToProps)(withRouter(CustomizedTables));
