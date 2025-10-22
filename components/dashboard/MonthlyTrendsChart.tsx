"use client";

import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const defaultTrendsData = [
  { month: "Jan", income: 9400, expenses: 4400 },
  { month: "Feb", income: 9800, expenses: 4800 },
  { month: "Mar", income: 9200, expenses: 5200 },
  { month: "Apr", income: 10500, expenses: 4500 },
  { month: "May", income: 9900, expenses: 5100 },
  { month: "Jun", income: 11200, expenses: 4900 },
  { month: "Jul", income: 10800, expenses: 5300 },
  { month: "Aug", income: 11500, expenses: 5000 },
  { month: "Sep", income: 10900, expenses: 4700 },
  { month: "Oct", income: 11800, expenses: 5400 },
  { month: "Nov", income: 12200, expenses: 5200 },
  { month: "Dec", income: 12800, expenses: 5600 },
];

interface MonthlyTrendsChartProps {
  data?: Array<{
    month: string;
    income: number;
    expenses: number;
  }>;
}

export const MonthlyTrendsChart = ({
  data = defaultTrendsData,
}: MonthlyTrendsChartProps) => {
  // Calculate growth rates
  const calculateGrowth = (values: number[]) => {
    if (values.length < 2) return 0;
    const firstValue = values[0];
    const lastValue = values[values.length - 1];
    return ((lastValue - firstValue) / firstValue) * 100;
  };

  const incomeGrowth = calculateGrowth(data.map((d) => d.income));
  const expenseGrowth = calculateGrowth(data.map((d) => d.expenses));

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: boolean;
    payload: { [key: string]: { value: number } };
    label: string;
  }) => {
    if (active && payload && payload.length) {
      const income = payload[0].value;
      const expenses = payload[1].value;
      const savings = income - expenses;
      const savingsRate = ((savings / income) * 100).toFixed(1);

      return (
        <div className="bg-black/90 border border-lightblue/20 p-3 rounded-lg shadow-lg min-w-[180px]">
          <p className="text-sm font-medium text-white mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-green">Income:</span>
              <span className="text-sm font-semibold text-green">
                ${income.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-red-500">Expenses:</span>
              <span className="text-sm font-semibold text-red-500">
                ${expenses.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-lightblue/20 pt-1 mt-1">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-blue-400">Savings:</span>
                <span className="text-sm font-semibold text-blue-400">
                  ${savings.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-lightgray/60">Rate:</span>
                <span className="text-xs text-lightgray/60">
                  {savingsRate}%
                </span>
              </div>
            </div>
          </div>
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
          <TrendingUp className="w-6 h-6 text-blue-500" />
          <span className="text-lg sm:text-2xl font-medium">
            Monthly Trends
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-lightgray/60">Period</p>
          <p className="text-sm font-medium">Last 12 Months</p>
        </div>
      </div>

      {/* Growth Indicators */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-black/20 p-4 rounded-lg">
          <p className="text-xs text-lightgray/60 mb-1">Income Growth</p>
          <p
            className={`text-xl font-bold ${
              incomeGrowth >= 0 ? "text-green" : "text-red-500"
            }`}
          >
            {incomeGrowth >= 0 ? "+" : ""}
            {incomeGrowth.toFixed(1)}%
          </p>
          <p className="text-xs text-lightgray/60 mt-1">year over year</p>
        </div>
        <div className="bg-black/20 p-4 rounded-lg">
          <p className="text-xs text-lightgray/60 mb-1">Expense Growth</p>
          <p
            className={`text-xl font-bold ${
              expenseGrowth <= 0 ? "text-green" : "text-red-500"
            }`}
          >
            {expenseGrowth >= 0 ? "+" : ""}
            {expenseGrowth.toFixed(1)}%
          </p>
          <p className="text-xs text-lightgray/60 mt-1">year over year</p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
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
          <Tooltip
            content={<CustomTooltip active={false} payload={{}} label={""} />}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ fill: "#ef4444", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Average Savings Rate */}
      <div className="mt-6 bg-black/20 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-lightgray/60 mb-1">Avg Savings Rate</p>
            <p className="text-2xl font-bold text-blue-500">
              {(
                (data.reduce(
                  (sum, item) => sum + (item.income - item.expenses),
                  0
                ) /
                  data.reduce((sum, item) => sum + item.income, 0)) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-lightgray/60 mb-1">Total Saved</p>
            <p className="text-xl font-bold text-green">
              $
              {data
                .reduce((sum, item) => sum + (item.income - item.expenses), 0)
                .toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
