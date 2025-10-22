// app/dashboard/components/PaymentCard.tsx
import { CreditCard } from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import type { PaymentAccount } from "../../types/dashboard";

interface PaymentCardProps {
  account: PaymentAccount;
}

export const PaymentCard = ({ account }: PaymentCardProps) => (
  <div className="flex items-center justify-between bg-lightgray/5 px-3 py-3 rounded-lg">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-green text-black rounded-md">
        <CreditCard className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm sm:text-base font-medium">{account.cardName}</p>
        <p className="text-xs text-lightgray/80">
          **** {account.lastFourDigits}
        </p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm sm:text-base font-semibold">
        {formatCurrency(account.balance)}
      </p>
      <p className="text-xs text-lightgray/80">{account.cardType}</p>
    </div>
  </div>
);
