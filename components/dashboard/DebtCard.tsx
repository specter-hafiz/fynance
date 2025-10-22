// app/dashboard/components/DebtCard.tsx
import { TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import type { Debt } from "../../types/dashboard";

interface DebtCardProps {
  debt: Debt;
}

export const DebtCard = ({ debt }: DebtCardProps) => {
  const isBorrowed = debt.type === "borrowed";
  const Icon = isBorrowed ? TrendingDown : TrendingUp;

  return (
    <div className="flex items-center justify-between bg-lightgray/5 rounded-lg px-3 py-3">
      <div className="flex items-center gap-3">
        <div
          className={`${
            isBorrowed ? "bg-red-500" : "bg-green"
          } rounded-md p-2 flex items-center justify-center`}
        >
          <Icon
            className={`w-5 h-5 ${isBorrowed ? "text-white" : "text-black"}`}
          />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-medium">{debt.name}</h3>
          <p className="text-xs sm:text-sm text-lightgray/80">
            Due {debt.dueDate}
          </p>
        </div>
      </div>
      <div className="text-right">
        <h3
          className={`text-sm sm:text-base font-semibold ${
            isBorrowed ? "text-red-500" : "text-green"
          }`}
        >
          {debt.amount > 0 ? "+" : ""}
          {formatCurrency(Math.abs(debt.amount))}
        </h3>
        <p className="text-xs text-lightgray/80">{debt.type}</p>
      </div>
    </div>
  );
};
