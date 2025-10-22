// app/dashboard/components/GoalCard.tsx
import { formatCurrency, calculatePercentage } from "../../utils/formatters";
import type { Goal } from "../../types/dashboard";

interface GoalCardProps {
  goal: Goal;
}

export const GoalCard = ({ goal }: GoalCardProps) => {
  const percentage = calculatePercentage(goal.current, goal.target);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm sm:text-base font-medium">{goal.name}</h3>
        <p className="text-sm text-lightgray/80">
          {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
        </p>
      </div>
      <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
        <div
          className="bg-green h-full rounded-full transition-all duration-300"
          style={{ width: `${Math.min(percentage, 100)}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${goal.name} progress`}
        >
          <span className="sr-only">{percentage.toFixed(1)}% complete</span>
        </div>
      </div>
    </div>
  );
};
