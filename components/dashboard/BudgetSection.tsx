// app/dashboard/components/BudgetSection.tsx
import { Pencil } from "lucide-react";
import {
  formatCurrency,
  calculatePercentage,
  formatPercentage,
} from "../../utils/formatters";
import type { Budget } from "../../types/dashboard";

interface BudgetSectionProps {
  budget: Budget;
}

export const BudgetSection = ({ budget }: BudgetSectionProps) => {
  const spent = budget.total - budget.available;
  const percentUsed = calculatePercentage(spent, budget.total);

  return (
    <section className="border border-lightblue/10 bg-lightblue/3 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-xl font-medium">Monthly Budget</h2>
        <button
          type="button"
          className="hover:text-green cursor-pointer transition-colors"
          aria-label="Edit monthly budget"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm sm:text-base text-lightgray/80">
            Available budget
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold">
            {formatCurrency(budget.available)}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-lightgray/80">Spent</p>
          <p className="text-sm sm:text-base">{formatCurrency(spent)}</p>
        </div>

        <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green h-full rounded-full transition-all duration-300"
            style={{ width: `${percentUsed}%` }}
            role="progressbar"
            aria-valuenow={percentUsed}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <p className="text-lightgray/80">
            {formatPercentage(percentUsed)} used
          </p>
          <p className="text-lightgray/80">
            Total: {formatCurrency(budget.total)}
          </p>
        </div>
      </div>
    </section>
  );
};
