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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 14vh 5vh 10vh 5vh;
`;

const Title = styled.h1`
  font-family: Optima, sans-serif;
  font-size: 1.7rem;
  font-weight: normal;
  color: black;
`;

export default function Chart({ data }) {
  return (
    <ChartContainer>
      <Title>Trees Planted Since Launch</Title>
      <LineChart
        width={900}
        height={400}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
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
