import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  margin: 10vh;
`;

const Title = styled.h1`
  color: #0c9e77;
`;

export default function Chart({ treeData }) {
  return (
    <ChartContainer>
      <Title>Trees Planted Per Day Since Launch</Title>
      <LineChart
        width={900}
        height={400}
        data={treeData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        data={treeData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="trees" />
        <Tooltip />
        <Legend />
        <Legend />

        <Line dataKey="trees" fill="#0c9e77" />
      </LineChart>
    </ChartContainer>
  );
}
