import React, { memo } from "react";
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

function PriorityChart(props) {
  let data;
  if (props.tickets) {
    data = {
      High: { name: "High", resolved: 0, unresolved: 0 },
      Medium: { name: "Medium", resolved: 0, unresolved: 0 },
      Low: { name: "Low", resolved: 0, unresolved: 0 }
    };
    props.tickets.forEach(ele => {
      let dep = data[ele.priority];
      if (ele.isDone) {
        dep.resolved++;
      } else {
        dep.unresolved++;
      }
    });
    data = Object.values(data);
    // data = [low, medium, high];
  }
  if (props.tickets) {
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
        <Bar dataKey="resolved" fill="#8884d8" />
        <Bar dataKey="unresolved" fill="#82ca9d" />
      </BarChart>
    );
  } else {
    return <></>;
  }
}

const mapStateToProps = state => {
  return {
    tickets: state.tickets
  };
};

export default memo(connect(mapStateToProps)(PriorityChart));
