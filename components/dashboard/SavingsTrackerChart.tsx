"use client";

import { PiggyBank, Target, TrendingUp, Calendar } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Line,
  ComposedChart,
} from "recharts";

const defaultSavingsData = [
  { month: "Jan", actual: 5000, target: 4000, cumulative: 5000 },
  { month: "Feb", actual: 5200, target: 4000, cumulative: 10200 },
  { month: "Mar", actual: 4800, target: 4000, cumulative: 15000 },
  { month: "Apr", actual: 6000, target: 4000, cumulative: 21000 },
  { month: "May", actual: 5500, target: 4000, cumulative: 26500 },
  { month: "Jun", actual: 6300, target: 4000, cumulative: 32800 },
  { month: "Jul", actual: 5800, target: 4000, cumulative: 38600 },
  { month: "Aug", actual: 6200, target: 4000, cumulative: 44800 },
  { month: "Sep", actual: 5900, target: 4000, cumulative: 50700 },
  { month: "Oct", actual: 6400, target: 4000, cumulative: 57100 },
  { month: "Nov", actual: 6100, target: 4000, cumulative: 63200 },
  { month: "Dec", actual: 6800, target: 4000, cumulative: 70000 },
];

interface SavingsTrackerChartProps {
  data?: Array<{
    month: string;
    actual: number;
    target: number;
    cumulative: number;
  }>;
  annualGoal?: number;
  currentSavings?: number;
}

export const SavingsTrackerChart = ({
  data = defaultSavingsData,
  annualGoal = 60000,
  currentSavings = 70000,
}: SavingsTrackerChartProps) => {
  // Calculate metrics
  const totalSaved = data.reduce((sum, item) => sum + item.actual, 0);
  const totalTarget = data.reduce((sum, item) => sum + item.target, 0);
  const avgMonthlySavings = totalSaved / data.length;
  const savingsRate = ((totalSaved / totalTarget) * 100).toFixed(1);
  const goalProgress = ((currentSavings / annualGoal) * 100).toFixed(1);
  const monthsAhead = Math.floor(
    (totalSaved - totalTarget) / avgMonthlySavings
  );

  // Projection for next 6 months
  const projectedSavings = currentSavings + avgMonthlySavings * 6;

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: boolean;
    payload: Array<{ dataKey: string; value?: number }>;
    label: string;
  }) => {
    if (active && payload && payload.length) {
      const actual =
        payload.find(
          (p: { dataKey: string; value?: number }) => p.dataKey === "actual"
        )?.value ?? 0;
      const target =
        payload.find(
          (p: { dataKey: string; value?: number }) => p.dataKey === "target"
        )?.value ?? 0;
      const cumulative =
        payload.find(
          (p: { dataKey: string; value?: number }) => p.dataKey === "cumulative"
        )?.value ?? 0;
      const difference = actual - target;

      return (
        <div className="bg-black/90 border border-lightblue/20 p-4 rounded-lg shadow-lg min-w-[200px]">
          <p className="text-sm font-medium text-white mb-2">{label}</p>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-blue-400">Saved:</span>
              <span className="text-sm font-semibold text-blue-400">
                ${actual.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-orange-400">Target:</span>
              <span className="text-sm font-semibold text-orange-400">
                ${target.toLocaleString()}
              </span>
            </div>
            <div className="border-t border-lightblue/20 pt-1.5 mt-1.5">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-green">Difference:</span>
                <span
                  className={`text-sm font-semibold ${
                    difference >= 0 ? "text-green" : "text-red-500"
                  }`}
                >
                  {difference >= 0 ? "+" : ""}${difference.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 mt-1">
                <span className="text-xs text-purple-400">Total:</span>
                <span className="text-sm font-semibold text-purple-400">
                  ${cumulative.toLocaleString()}
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
          <PiggyBank className="w-6 h-6 text-blue-500" />
          <span className="text-lg sm:text-2xl font-medium">
            Savings Tracker
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-lightgray/60">Annual Goal Progress</p>
          <p className="text-lg font-bold text-blue-500">{goalProgress}%</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-black/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank className="w-4 h-4 text-blue-500" />
            <p className="text-xs text-lightgray/60">Current Savings</p>
          </div>
          <p className="text-xl font-bold text-blue-500">
            ${currentSavings.toLocaleString()}
          </p>
          <p className="text-xs text-lightgray/60 mt-1">
            ${annualGoal.toLocaleString()} goal
          </p>
        </div>

        <div className="bg-black/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green" />
            <p className="text-xs text-lightgray/60">Avg Monthly</p>
          </div>
          <p className="text-xl font-bold text-green">
            $
            {avgMonthlySavings.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="text-xs text-lightgray/60 mt-1">
            {savingsRate}% of target
          </p>
        </div>

        <div className="bg-black/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-purple-500" />
            <p className="text-xs text-lightgray/60">Progress</p>
          </div>
          <p className="text-xl font-bold text-purple-500">
            {monthsAhead > 0 ? `+${monthsAhead}` : monthsAhead} months
          </p>
          <p className="text-xs text-lightgray/60 mt-1">
            {monthsAhead >= 0 ? "ahead of target" : "behind target"}
          </p>
        </div>

        <div className="bg-black/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-orange-500" />
            <p className="text-xs text-lightgray/60">6-Month Projection</p>
          </div>
          <p className="text-xl font-bold text-orange-500">
            ${projectedSavings.toLocaleString()}
          </p>
          <p className="text-xs text-lightgray/60 mt-1">at current rate</p>
        </div>
      </div>

      {/* Monthly Savings Chart */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Monthly Savings vs Target
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.3}
            />
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
              content={
                <CustomTooltip
                  active={false}
                  payload={[{ dataKey: "", value: 0 }]}
                  label={""}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorActual)"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#f97316"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Cumulative Savings Chart */}
      <div>
        <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          Cumulative Savings Growth
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
              opacity={0.3}
            />
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
              content={
                <CustomTooltip
                  active={false}
                  payload={[{ dataKey: "", value: 0 }]}
                  label={""}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="#8b5cf6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCumulative)"
            />
            <ReferenceLine
              y={annualGoal}
              stroke="#10b981"
              strokeDasharray="5 5"
              label={{
                value: `Goal: $${annualGoal.toLocaleString()}`,
                fill: "#10b981",
                fontSize: 12,
                position: "right",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Goal Progress Bar */}
      <div className="mt-6 bg-black/20 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Annual Goal Progress</span>
          <span className="text-sm font-bold text-blue-500">
            {goalProgress}%
          </span>
        </div>
        <div className="w-full bg-black/40 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(parseFloat(goalProgress), 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-lightgray/60">
            ${currentSavings.toLocaleString()} saved
          </span>
          <span className="text-xs text-lightgray/60">
            ${(annualGoal - currentSavings).toLocaleString()} remaining
          </span>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {parseFloat(goalProgress) >= 100 ? (
          <div className="col-span-2 p-4 bg-green/10 border border-green/20 rounded-lg">
            <p className="text-sm text-green flex items-center gap-2">
              🎉 <strong>Congratulations!</strong> You&lsquo;ve reached your
              annual savings goal!
            </p>
          </div>
        ) : monthsAhead >= 2 ? (
          <div className="p-4 bg-green/10 border border-green/20 rounded-lg">
            <p className="text-sm text-green">
              ✅ Great job! You&lsquo;re {monthsAhead} months ahead of your
              savings target.
            </p>
          </div>
        ) : monthsAhead < 0 ? (
          <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
            <p className="text-sm text-orange-500">
              ⚠️ You&lsquo;re behind target. Consider increasing monthly savings
              by $
              {Math.abs(
                Math.floor((totalTarget - totalSaved) / data.length)
              ).toLocaleString()}
              .
            </p>
          </div>
        ) : null}

        {projectedSavings >= annualGoal && parseFloat(goalProgress) < 100 && (
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-sm text-blue-500">
              📊 At your current rate, you&lsquo;ll reach your goal in{" "}
              {Math.ceil((annualGoal - currentSavings) / avgMonthlySavings)}{" "}
              months.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
