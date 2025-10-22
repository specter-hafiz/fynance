"use client";

import { TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const defaultIncomeData = [
  { name: "Salary", value: 5000, color: "#10b981" },
  { name: "Freelance", value: 1500, color: "#3b82f6" },
  { name: "Investments", value: 800, color: "#8b5cf6" },
  { name: "Rental Income", value: 1200, color: "#f59e0b" },
  { name: "Side Business", value: 600, color: "#ec4899" },
  { name: "Other", value: 300, color: "#6b7280" },
];

interface IncomeSourcesChartProps {
  data?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const IncomeSourcesChart = ({
  data = defaultIncomeData,
}: IncomeSourcesChartProps) => {
  const totalIncome = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-lightblue/20 p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-white">{payload[0].name}</p>
          <p className="text-sm text-green">
            ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-xs text-lightgray/60">
            {((payload[0].value / totalIncome) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-lg bg-lightblue/3 border border-lightblue/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <TrendingUp className="w-6 h-6 text-green" />
        <span className="text-lg sm:text-2xl font-medium">Income Sources</span>
      </div>

      {/* Chart with Center Text */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xs text-lightgray/60">Total Income</p>
            <p className="text-2xl font-bold text-green">
              ${totalIncome.toLocaleString()}
            </p>
            <p className="text-xs text-lightgray/60">this month</p>
          </div>
        </div>
      </div>

      {/* Category List */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {data
          .sort((a, b) => b.value - a.value)
          .map((item, index) => {
            const percentage = ((item.value / totalIncome) * 100).toFixed(1);
            return (
              <div
                key={index}
                className="bg-black/20 p-3 rounded-lg hover:bg-black/30 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-lightgray/80 font-medium">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold">
                    ${item.value.toLocaleString()}
                  </span>
                  <span className="text-xs text-lightgray/60">
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
