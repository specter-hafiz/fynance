// app/dashboard/components/ScheduledPaymentCard.tsx
import { formatCurrency } from "../../utils/formatters";
import type { ScheduledPayment } from "../../types/dashboard";

interface ScheduledPaymentCardProps {
  payment: ScheduledPayment;
}

export const ScheduledPaymentCard = ({
  payment,
}: ScheduledPaymentCardProps) => (
  <div className="flex items-center justify-between bg-lightgray/5 px-3 py-3 rounded-lg">
    <div className="flex gap-3 items-center">
      <div className="w-4 h-4 bg-green rounded-md" />
      <div>
        <h3 className="text-sm sm:text-base font-medium">{payment.name}</h3>
        <p className="text-xs text-lightgray/80">{payment.date}</p>
      </div>
    </div>
    <div className="text-right">
      <h3 className="text-sm sm:text-base font-semibold">
        {formatCurrency(payment.amount)}
      </h3>
      <p className="text-xs text-green capitalize">{payment.status}</p>
    </div>
  </div>
);
