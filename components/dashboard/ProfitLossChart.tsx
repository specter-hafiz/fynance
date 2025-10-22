"use client";

import { DollarSign } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const defaultProfitLossData = [
  { month: "Jan", income: 9400, expenses: 4400, profit: 5000 },
  { month: "Feb", income: 9800, expenses: 4800, profit: 5000 },
  { month: "Mar", income: 9200, expenses: 5200, profit: 4000 },
  { month: "Apr", income: 10500, expenses: 4500, profit: 6000 },
  { month: "May", income: 9900, expenses: 5100, profit: 4800 },
  { month: "Jun", income: 11200, expenses: 4900, profit: 6300 },
];

interface ProfitLossChartProps {
  data?: Array<{
    month: string;
    income: number;
    expenses: number;
    profit: number;
  }>;
}

export const ProfitLossChart = ({
  data = defaultProfitLossData,
}: ProfitLossChartProps) => {
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const avgProfit = totalProfit / data.length;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-lightblue/20 p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-white mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4"
            >
              <span className="text-xs" style={{ color: entry.color }}>
                {entry.name}:
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: entry.color }}
              >
                ${entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-lg bg-lightblue/3 border border-lightblue/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <DollarSign className="w-6 h-6 text-green" />
          <span className="text-lg sm:text-2xl font-medium">Profit & Loss</span>
        </div>
        <div className="text-right">
          <p className="text-xs text-lightgray/60">Avg Monthly Profit</p>
          <p className="text-lg font-bold text-green">
            ${avgProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis
            dataKey="month"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
          <ReferenceLine y={0} stroke="#666" />
          <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-black/20 p-3 rounded-lg text-center">
          <p className="text-xs text-lightgray/60 mb-1">Total Income</p>
          <p className="text-lg font-bold text-green">
            ${data.reduce((sum, item) => sum + item.income, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-black/20 p-3 rounded-lg text-center">
          <p className="text-xs text-lightgray/60 mb-1">Total Expenses</p>
          <p className="text-lg font-bold text-red-500">
            $
            {data
              .reduce((sum, item) => sum + item.expenses, 0)
              .toLocaleString()}
          </p>
        </div>
        <div className="bg-black/20 p-3 rounded-lg text-center">
          <p className="text-xs text-lightgray/60 mb-1">Net Profit</p>
          <p className="text-lg font-bold text-blue-500">
            ${totalProfit.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};
