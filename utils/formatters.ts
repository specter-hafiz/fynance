// app/dashboard/utils/formatters.ts

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculatePercentage = (current: number, total: number): number => {
  return (current / total) * 100;
};

export const formatPercentage = (percent: number): string => {
  return `${percent.toFixed(1)}%`;
};
