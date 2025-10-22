"use client";

import { Flame } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const defaultBurnRateData = [
  { month: "Jan", burnRate: 4400, runway: 52 },
  { month: "Feb", burnRate: 4800, runway: 47 },
  { month: "Mar", burnRate: 5200, runway: 44 },
  { month: "Apr", burnRate: 4500, runway: 51 },
  { month: "May", burnRate: 5100, runway: 45 },
  { month: "Jun", burnRate: 4900, runway: 47 },
];

interface BurnRateChartProps {
  data?: Array<{
    month: string;
    burnRate: number;
    runway: number;
  }>;
  currentBalance?: number;
}

export const BurnRateChart = ({
  data = defaultBurnRateData,
  currentBalance = 228236,
}: BurnRateChartProps) => {
  const avgBurnRate =
    data.reduce((sum, item) => sum + item.burnRate, 0) / data.length;
  const currentRunway = Math.floor(currentBalance / avgBurnRate);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: boolean;
    payload: any[];
    label: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 border border-lightblue/20 p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-white mb-2">{label}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-orange-400">Burn Rate:</span>
              <span className="text-sm font-semibold text-orange-400">
                ${payload[0].value.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-blue-400">Runway:</span>
              <span className="text-sm font-semibold text-blue-400">
                {payload[1]?.value} months
              </span>
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
          <Flame className="w-6 h-6 text-orange-500" />
          <span className="text-lg sm:text-2xl font-medium">
            Burn Rate & Runway
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs text-lightgray/60">Current Runway</p>
          <p className="text-lg font-bold text-blue-500">
            {currentRunway} months
          </p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-black/20 p-4 rounded-lg">
          <p className="text-xs text-lightgray/60 mb-1">Avg Monthly Burn</p>
          <p className="text-xl font-bold text-orange-500">
            $
            {avgBurnRate.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="text-xs text-lightgray/60 mt-1">per month</p>
        </div>
        <div className="bg-black/20 p-4 rounded-lg">
          <p className="text-xs text-lightgray/60 mb-1">Current Balance</p>
          <p className="text-xl font-bold text-green">
            ${currentBalance.toLocaleString()}
          </p>
          <p className="text-xs text-lightgray/60 mt-1">available funds</p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorBurnRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
          <XAxis
            dataKey="month"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <YAxis
            yAxisId="left"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#94a3b8"
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickFormatter={(value) => `${value}m`}
          />
          <Tooltip
            content={<CustomTooltip active={false} payload={[]} label={""} />}
          />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="burnRate"
            stroke="#f97316"
            fillOpacity={1}
            fill="url(#colorBurnRate)"
          />
          <ReferenceLine
            yAxisId="left"
            y={avgBurnRate}
            stroke="#f97316"
            strokeDasharray="5 5"
            label={{ value: "Avg", fill: "#f97316", fontSize: 12 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Warning */}
      {currentRunway < 12 && (
        <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
          <p className="text-sm text-orange-500">
            ⚠️ Warning: Your runway is below 12 months. Consider reducing
            expenses or increasing income.
          </p>
        </div>
      )}
    </div>
  );
};
