// app/dashboard/data/mockData.ts
import type {
  PaymentAccount,
  Goal,
  Debt,
  ScheduledPayment,
  ExchangeRate,
  Transaction,
  DashboardStats,
  Budget,
} from "../types/dashboard";

export const dashboardStats: DashboardStats = {
  overallBalance: 228236,
  monthlyIncome: 269000,
  monthlyExpenses: 40764,
};

export const paymentAccounts: PaymentAccount[] = [
  {
    id: 1,
    cardName: "Visa Card",
    lastFourDigits: "1234",
    balance: 5000,
    cardType: "Visa",
  },
  {
    id: 2,
    cardName: "Mastercard",
    lastFourDigits: "5678",
    balance: 3200,
    cardType: "Mastercard",
  },
  {
    id: 3,
    cardName: "Visa Card",
    lastFourDigits: "9012",
    balance: 7800,
    cardType: "Visa",
  },
];

export const goals: Goal[] = [
  { id: 1, name: "Send wife to space", current: 134000, target: 150000 },
  { id: 3, name: "New car", current: 520000, target: 1000000 },
];

export const debts: Debt[] = [
  {
    id: 1,
    name: "Credit card",
    amount: -5400,
    dueDate: "Jul 5",
    type: "borrowed",
  },
  {
    id: 2,
    name: "Credit card",
    amount: 22000,
    dueDate: "Dec 7",
    type: "lent",
  },
];

export const budget: Budget = {
  available: 5200,
  total: 15200,
};

export const scheduledPayments: ScheduledPayment[] = [
  { id: 1, name: "Rent", amount: 20000, date: "June 1", status: "paid" },
  { id: 2, name: "Utilities", amount: 20000, date: "June 1", status: "paid" },
];

export const exchangeRates: ExchangeRate[] = [
  { id: 1, from: "USD", to: "EUR", rate: 42 },
  { id: 2, from: "USD", to: "GBP", rate: 42 },
  { id: 3, from: "USD", to: "JPY", rate: 42 },
];

export const recentTransactions: Transaction[] = [
  {
    id: 1,
    merchant: "Apple",
    cardLastFour: "1234",
    amount: -1200,
    time: "17:20",
    type: "expense",
  },
  {
    id: 2,
    merchant: "Amazon",
    cardLastFour: "1234",
    amount: -1200,
    time: "17:20",
    type: "expense",
  },
  {
    id: 3,
    merchant: "Walmart",
    cardLastFour: "1234",
    amount: -1200,
    time: "17:20",
    type: "expense",
  },
  {
    id: 4,
    merchant: "Target",
    cardLastFour: "1234",
    amount: -1200,
    time: "17:20",
    type: "expense",
  },
  {
    id: 5,
    merchant: "Starbucks",
    cardLastFour: "1234",
    amount: -1200,
    time: "17:20",
    type: "expense",
  },
];

export const expenseBreakdown = [
  { name: "Housing", value: 1200, color: "#10b981" },
  { name: "Food", value: 450, color: "#3b82f6" },
  { name: "Transportation", value: 350, color: "#f59e0b" },
  { name: "Entertainment", value: 200, color: "#8b5cf6" },
  { name: "Utilities", value: 180, color: "#ec4899" },
  { name: "Healthcare", value: 150, color: "#ef4444" },
  { name: "Other", value: 234, color: "#6b7280" },
];

export const incomeSources = [
  { name: "Salary", value: 5000, color: "#10b981" },
  { name: "Freelance", value: 1500, color: "#3b82f6" },
  { name: "Investments", value: 800, color: "#8b5cf6" },
  { name: "Rental Income", value: 1200, color: "#f59e0b" },
  { name: "Side Business", value: 600, color: "#ec4899" },
  { name: "Other", value: 300, color: "#6b7280" },
];

export const profitLossData = [
  { month: "Jan", income: 9400, expenses: 4400, profit: 5000 },
  { month: "Feb", income: 9800, expenses: 4800, profit: 5000 },
  { month: "Mar", income: 9200, expenses: 5200, profit: 4000 },
  { month: "Apr", income: 10500, expenses: 4500, profit: 6000 },
  { month: "May", income: 9900, expenses: 5100, profit: 4800 },
  { month: "Jun", income: 11200, expenses: 4900, profit: 6300 },
];

export const burnRateData = [
  { month: "Jan", burnRate: 4400, runway: 52 },
  { month: "Feb", burnRate: 4800, runway: 47 },
  { month: "Mar", burnRate: 5200, runway: 44 },
  { month: "Apr", burnRate: 4500, runway: 51 },
  { month: "May", burnRate: 5100, runway: 45 },
  { month: "Jun", burnRate: 4900, runway: 47 },
];

export const monthlyTrendsData = [
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

export const savingsData = [
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

export const savingsGoal = {
  annualGoal: 60000,
  currentSavings: 70000,
};
