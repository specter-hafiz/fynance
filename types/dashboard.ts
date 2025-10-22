// app/dashboard/types/index.ts

export interface PaymentAccount {
  id: number;
  cardName: string;
  lastFourDigits: string;
  balance: number;
  cardType: string;
}

export interface Goal {
  id: number;
  name: string;
  current: number;
  target: number;
}

export interface Debt {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  type: "borrowed" | "lent";
}

export interface ScheduledPayment {
  id: number;
  name: string;
  amount: number;
  date: string;
  status: "paid" | "pending";
}

export interface ExchangeRate {
  id: number;
  from: string;
  to: string;
  rate: number;
}

export interface Transaction {
  id: number;
  merchant: string;
  cardLastFour: string;
  amount: number;
  time: string;
  type: "expense" | "income";
}

export interface DashboardStats {
  overallBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
}

export interface Budget {
  available: number;
  total: number;
}
