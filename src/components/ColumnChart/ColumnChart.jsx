import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
const data = [
  {
    name: "Page A",
    Volume: 2400,
  },
  {
    name: "Page B",
    Volume: 1398,
  },
  {
    name: "Page C",
    Volume: 9800,
  },
  {
    name: "Page A",
    Volume: 2400,
  },
  {
    name: "Page B",
    Volume: 1398,
  },
  {
    name: "Page C",
    Volume: 9800,
  },
  {
    name: "Page D",
    Volume: 3908,
  },
  {
    name: "Page E",
    Volume: 4800,
  },
  {
    name: "Page F",
    Volume: 3800,
  },
  {
    name: "Page C",
    Volume: 9800,
  },
  {
    name: "Page D",
    Volume: 3908,
  },
  {
    name: "Page E",
    Volume: 4800,
  },
];

export default function ColumnChart() {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Volume" fill="#2172E5" />
    </BarChart>
  );
}
