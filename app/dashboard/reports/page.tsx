import ProfileAvatar from "@/components/auth/ProfileAvatar";
import { BurnRateChart } from "@/components/dashboard/BurnRateChart";
import { ExpenseBreakdown } from "@/components/dashboard/ExpenseBreakdown";
import { IncomeSourcesChart } from "@/components/dashboard/IncomeSourcesChart";
import { MonthlyTrendsChart } from "@/components/dashboard/MonthlyTrendsChart";
import { ProfitLossChart } from "@/components/dashboard/ProfitLossChart";
import { SavingsTrackerChart } from "@/components/dashboard/SavingsTrackerChart";
import {
  burnRateData,
  dashboardStats,
  expenseBreakdown,
  incomeSources,
  monthlyTrendsData,
  profitLossData,
  savingsData,
  savingsGoal,
} from "@/data/dashboardData";
import { TrendingDown } from "lucide-react";
import React from "react";

const Reports = () => {
  return (
    <div className="flex flex-col flex-1">
      {/* header */}
      <div className="bg-lightblue/3 border-b border-lightblue/10 px-3 sm:px-8 py-3 sticky top-0 backdrop-blur-md z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Reports
          </h1>
          <ProfileAvatar />
        </div>
      </div>
      {/* content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] my-8 flex-1 overflow-y-auto px-4 sm:px-8 gap-6">
        <aside className="flex flex-col gap-4 gap-6">
          <div className="rounded-lg bg-lightblue/3 border border-lightblue/10 p-6">
            <div className=" flex items-center justify-center gap-4 mb-4">
              <TrendingDown className="w-6 h-6 text-red-500 inline-flex" />{" "}
              <span className="text-lg sm:text-2xl font-medium">
                Top 3 Expense Categories
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm sm:text-lg font-medium">Travel</h2>
                  <p className="text-sm text-lightgray/80">73,982 $</p>
                </div>
                {/* progress */}
                <div className="w-full bg-white/10 rounded-full h-5">
                  <div
                    className="bg-blue-500 h-5 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm sm:text-lg font-medium">Food</h2>
                  <p className="text-sm text-lightgray/80">17,000 $</p>
                </div>
                {/* progress */}
                <div className="w-full bg-white/10 rounded-full h-5">
                  <div
                    className="bg-white h-5 rounded-full"
                    style={{ width: "23%" }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm sm:text-lg font-medium">Travel</h2>
                  <p className="text-sm text-lightgray/80">12,234 $</p>
                </div>
                {/* progress */}
                <div className="w-full bg-white/10 rounded-full h-5">
                  <div
                    className="bg-lightblue h-5 rounded-full"
                    style={{ width: "15%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <ExpenseBreakdown data={expenseBreakdown} />
          <IncomeSourcesChart data={incomeSources} />
        </aside>
        <main className="flex flex-col gap-4">
          <ProfitLossChart data={profitLossData} />
          <MonthlyTrendsChart data={monthlyTrendsData} />
          <BurnRateChart
            data={burnRateData}
            currentBalance={dashboardStats.overallBalance}
          />
          <SavingsTrackerChart
            data={savingsData}
            annualGoal={savingsGoal.annualGoal}
            currentSavings={savingsGoal.currentSavings}
          />
        </main>
      </div>
    </div>
  );
};

export default Reports;
