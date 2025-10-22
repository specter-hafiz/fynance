// app/dashboard/components/StatCard.tsx
import { LucideIcon } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  iconBgColor: string;
  iconColor?: string;
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  iconBgColor,
  iconColor = "text-black",
}: StatCardProps) => (
  <div className="flex gap-4 sm:gap-6">
    <div
      className={`flex items-center justify-center p-3 sm:p-5 ${iconBgColor} ${iconColor} rounded-md`}
    >
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-sm text-lightgray/80">{label}</p>
      <h2 className="text-2xl sm:text-3xl font-semibold mt-1">
        {formatCurrency(value)}
      </h2>
    </div>
  </div>
);
