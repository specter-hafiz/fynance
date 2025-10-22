// app/dashboard/components/ExchangeRateCard.tsx
import type { ExchangeRate } from "../../types/dashboard";

interface ExchangeRateCardProps {
  rate: ExchangeRate;
}

export const ExchangeRateCard = ({ rate }: ExchangeRateCardProps) => (
  <div className="flex items-center justify-start bg-lightgray/5 px-3 py-3 rounded-lg">
    <p className="text-sm sm:text-base">
      1 {rate.from} = {rate.rate} {rate.to}
    </p>
  </div>
);
