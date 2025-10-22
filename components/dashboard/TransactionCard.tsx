// app/dashboard/components/TransactionCard.tsx
import { Banknote } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import type { Transaction } from "../../types/dashboard";

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => (
  <div className="bg-lightgray/5 rounded-lg flex items-center justify-between px-3 py-3">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-green text-black rounded-md">
        <Banknote className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-sm sm:text-base font-medium">
          {transaction.merchant}
        </h3>
        <p className="text-xs text-lightgray/80">
          from **** {transaction.cardLastFour}
        </p>
      </div>
    </div>
    <div className="text-right">
      <h3
        className={`text-sm sm:text-base font-semibold ${
          transaction.amount < 0 ? "text-red-500" : "text-green"
        }`}
      >
        {transaction.amount > 0 ? "+" : ""}
        {formatCurrency(Math.abs(transaction.amount))}
      </h3>
      <p className="text-xs text-lightgray/80">{transaction.time}</p>
    </div>
  </div>
);
