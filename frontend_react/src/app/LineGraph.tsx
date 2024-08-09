"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Config for the lines representing Invested Amount and Portfolio Value
const chartConfig = {
  invested: {
    label: "Invested Amount",
    color: "hsl(var(--chart-1))",
  },
  currentValue: {
    label: "Portfolio Value",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function NetWorthGraph() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://127.0.0.1:5000/api/portfolio')
      .then(response => {
        const fetchedData = response.data.map((item: {
          date: string;
          bonds_current: number;
          bonds_invested: number;
          cash: number;
          stocks_current: number;
          stocks_invested: number;
        }) => ({
          date: item.date,
          InvestedAmount: item.stocks_invested + item.bonds_invested,
          PortfolioValue: item.stocks_current + item.bonds_current,
        }));

        // Reverse the data for X-Axis
        const reversedData = [...fetchedData].reverse();
        setData(reversedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run once on mount

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 7)} // Adjust as needed
          />
          <YAxis />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="InvestedAmount"
            type="monotone"
            stroke="var(--color-invested)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="PortfolioValue"
            type="monotone"
            stroke="var(--color-currentValue)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </ResponsiveContainer>
  );
}
