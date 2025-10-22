"use client";

import { TrendingDown } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

// Sample expense data - replace with your actual data
const expenseData = [
  { name: "Housing", value: 1200, color: "#10b981" }, // green
  { name: "Food", value: 450, color: "#3b82f6" }, // blue
  { name: "Transportation", value: 350, color: "#f59e0b" }, // amber
  { name: "Entertainment", value: 200, color: "#8b5cf6" }, // purple
  { name: "Utilities", value: 180, color: "#ec4899" }, // pink
  { name: "Healthcare", value: 150, color: "#ef4444" }, // red
  { name: "Other", value: 234, color: "#6b7280" }, // gray
];

interface ExpenseBreakdownProps {
  data?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const ExpenseBreakdown = ({
  data = expenseData,
}: ExpenseBreakdownProps) => {
  // Calculate total expenses
  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);

  // Custom label to show percentage
  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    // Only show label if percentage is above 5%
    if (percent < 0.05) return null;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-lightblue/20 p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-white">{payload[0].name}</p>
          <p className="text-sm text-green">
            ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-xs text-lightgray/60">
            {((payload[0].value / totalExpenses) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-lightgray/80 truncate">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="rounded-lg bg-lightblue/3 border border-lightblue/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-4 mb-2">
        <TrendingDown className="w-6 h-6 text-red-500 inline-flex" />
        <span className="text-lg sm:text-2xl font-medium">
          Expense Breakdown
        </span>
      </div>

      {/* Pie Chart */}
      <div className="w-full">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              // label={renderCustomLabel}
              outerRadius={100}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        {/* <div className="mt-6">
          {renderLegend({
            payload: data.map((item) => ({
              ...item,
              value: item.name,
              color: item.color,
            })),
          })}
        </div> */}
      </div>

      {/* Detailed Breakdown */}
      <div className="mt-6 space-y-2">
        {data
          .sort((a, b) => b.value - a.value)
          .map((item, index) => {
            const percentage = ((item.value / totalExpenses) * 100).toFixed(1);
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-lightgray/80">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">
                    ${item.value.toLocaleString()}
                  </span>
                  <span className="text-xs text-lightgray/60 w-12 text-right">
                    {percentage}%
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
