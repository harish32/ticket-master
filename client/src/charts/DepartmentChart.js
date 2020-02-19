import React from "react";
import { connect } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

function DepartmentChart(props) {
  let data;
  if (props.tickets.length > 0 && props.departments.length > 0) {
    const deps = new Map([]);
    props.departments.forEach(ele =>
      deps.set(ele._id, { name: ele.name, High: 0, Medium: 0, Low: 0 })
    );
    props.tickets.forEach(ele => {
      let department = deps.get(ele.department._id);
      department = {
        ...department,
        [ele.priority]: department[ele.priority] + 1
      };
      deps.set(ele.department._id, department);
    });
    data = Array.from(deps.values());
  }
  if (data) {
    return (
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Low" fill="#4ce670" />
        <Bar dataKey="Medium" fill="#9b4ce6" />
        <Bar dataKey="High" fill="#ed1111" />
      </BarChart>
    );
  } else {
    return <></>;
  }
}

const mapStateToProps = state => {
  return {
    departments: state.departments,
    tickets: state.tickets
  };
};

export default connect(mapStateToProps)(DepartmentChart);
