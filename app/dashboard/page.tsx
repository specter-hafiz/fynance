import React from "react";
import ProfileAvatar from "@/components/auth/ProfileAvatar";
import {
  Banknote,
  CreditCard,
  DatabaseZap,
  Pencil,
  Plus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

interface PaymentCardProps {
  cardName: string;
  lastFourDigits: string;
  balance: number;
  cardType: string;
}

const PaymentCard = ({
  cardName,
  lastFourDigits,
  balance,
  cardType,
}: PaymentCardProps) => (
  <div className="flex items-center justify-between bg-lightgray/5 px-2 py-3 rounded-lg mb-3">
    <div className="flex items-center gap-4">
      <div className="p-2 bg-green text-black rounded-md w-fit flex items-center justify-center">
        <CreditCard className="w-5 h-5" />
      </div>
      <div>
        <p className="text-base">{cardName}</p>
        <p className="text-xs text-lightgray/80">**** {lastFourDigits}</p>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <p className="text-base">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(balance)}
      </p>
      <p className="text-xs text-lightgray/80">{cardType}</p>
    </div>
  </div>
);

const Dashboard = () => {
  // Mock data
  const paymentAccounts = [
    {
      id: 1,
      cardName: "Visa Card",
      lastFourDigits: "1234",
      balance: 5000,
      cardType: "Visa",
    },
    {
      id: 2,
      cardName: "Mastercard",
      lastFourDigits: "5678",
      balance: 3200,
      cardType: "Mastercard",
    },
    {
      id: 3,
      cardName: "Visa Card",
      lastFourDigits: "9012",
      balance: 7800,
      cardType: "Visa",
    },
  ];

  // Budget values
  const availableBudget = 5200;
  const totalBudget = 15200;
  const spent = totalBudget - availableBudget;
  const percentUsed = (spent / totalBudget) * 100;

  return (
    <div className="flex flex-col h-screen bg-lightblue/3">
      {/* fixed header */}
      <header className="flex-shrink-0 bg-lightblue/3 border-b border-lightblue/10 px-4 sm:px-8 py-3 sticky top-0 backdrop-blur-md z-10">
        <div className="flex items-center justify-between">
          <nav
            className="flex flex-wrap gap-3 sm:gap-5"
            aria-label="Workspaces"
          >
            <button
              type="button"
              className="border border-green rounded-full px-3 py-3 text-sm text-green hover:bg-green/10 transition-colors cursor-pointer"
            >
              Personal space
            </button>
            <button
              type="button"
              className="rounded-full px-3 py-3 text-sm hover:bg-green/10 hover:border hover:text-green border border-transparent transition-colors cursor-pointer"
            >
              Work Space
            </button>
            <button
              type="button"
              className="px-3 py-3 text-sm cursor-pointer text-lightblue/80 hover:text-white underline"
            >
              <Plus className="inline-block w-4 h-4 mr-1" /> Add new
            </button>
          </nav>
          <ProfileAvatar />
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 sm:px-8 my-6">
        {/* stats */}
        <section
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 lg:gap-16 mb-8"
          aria-label="Account Statistics"
        >
          <div className="flex gap-4 sm:gap-6">
            <div className="flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-5 bg-lightblue text-black rounded-md">
              <DatabaseZap className="w-3 h-3 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-sm text-lightgray/80">Overall Balance</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mt-1">
                228,236 $
              </h2>
            </div>
          </div>
          <div className="flex gap-4 sm:gap-6">
            <div className="flex items-center justify-center p-2 sm:p-5 bg-green text-black rounded-md">
              <TrendingUp className="w-3 h-3 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-sm text-lightgray/80">Monthly income</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mt-1">
                269,000 $
              </h2>
            </div>
          </div>
          <div className="flex gap-4 sm:gap-6">
            <div className="flex items-center justify-center p-2 sm:p-5 bg-red-500 text-white rounded-md">
              <TrendingDown className="w-3 h-3 sm:w-5 sm:h-5" />
            </div>
            <div>
              <p className="text-sm text-lightgray/80">Monthly expenses</p>
              <h2 className="text-2xl sm:text-3xl font-semibold mt-1">
                40,764 $
              </h2>
            </div>
          </div>
        </section>

        {/* Main content area */}
        <section
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 mb-6"
          aria-label="Main Dashboard Content"
        >
          {/* Payment Accounts & Goals */}
          <div className="flex flex-col gap-6">
            {/* Payment Accounts Section */}
            <section className="flex flex-col border border-lightblue/10 bg-lightblue/3 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-medium">
                  Payment Accounts
                </h2>
                <button
                  type="button"
                  className="hover:text-green cursor-pointer transition-colors"
                  aria-label="Edit payment accounts"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-y-auto flex-1">
                {paymentAccounts.map((account) => (
                  <PaymentCard
                    key={account.id}
                    cardName={account.cardName}
                    lastFourDigits={account.lastFourDigits}
                    balance={account.balance}
                    cardType={account.cardType}
                  />
                ))}
              </div>
            </section>
            {/* Goals */}
            <section className="border border-lightblue/10 bg-lightblue/3 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-4 w-full">
                <h2 className="text-lg md:text-xl font-medium">Your Goals</h2>
                <button
                  type="button"
                  className="hover:text-green cursor-pointer transition-colors"
                  aria-label="Edit your goals"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm sm:text-base font-medium mt-1">
                      Send wife to space
                    </h2>
                    <p className="text-sm text-lightgray/80">
                      134,000 $ / 150,000 $
                    </p>
                  </div>
                  <div>
                    <div className="w-full bg-black/20 rounded-full h-4">
                      <div
                        className="bg-green h-4 rounded-full transition-all"
                        style={{ width: `89%` }}
                      >
                        <span className="sr-only">89% complete</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm sm:text-base font-medium mt-1">
                      Send wife to space
                    </h2>
                    <p className="text-sm text-lightgray/80">
                      134,000 $ / 150,000 $
                    </p>
                  </div>
                  <div>
                    <div className="w-full bg-black/20 rounded-full h-4">
                      <div
                        className="bg-green h-4 rounded-full transition-all"
                        style={{ width: `89%` }}
                      >
                        <span className="sr-only">89% complete</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm sm:text-base font-medium mt-1">
                      Send wife to space
                    </h2>
                    <p className="text-sm text-lightgray/80">
                      134,000 $ / 150,000 $
                    </p>
                  </div>
                  <div>
                    <div className="w-full bg-black/20 rounded-full h-4">
                      <div
                        className="bg-green h-4 rounded-full transition-all"
                        style={{ width: `89%` }}
                      >
                        <span className="sr-only">89% complete</span>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </section>
            {/* debts */}
            <section className="border border-lightblue/10 bg-lightblue/3 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-4 w-full">
                <h2 className="text-lg md:text-xl font-medium">Debts</h2>
                <button
                  type="button"
                  className="hover:text-green cursor-pointer transition-colors"
                  aria-label="Edit your debts"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between bg-lightgray/5 rounded-md px-2 py-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500 rounded-md p-2 flex items-center justify-center">
                      <TrendingDown className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-md text-medium">
                        Credit card
                      </h2>
                      <p className="text-sm text-lightgray/80">Due Jul 5</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h2 className="text-base sm:text-md font-semibold mt-2 text-red-500">
                      - 5,400 $
                    </h2>
                    <p className="text-sm text-lightgray/80">borrowed</p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-lightgray/5 rounded-md px-2 py-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-green rounded-md p-2 flex items-center justify-center text-black">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-md text-medium">
                        Credit card
                      </h2>
                      <p className="text-sm text-lightgray/80">Due Dec 7</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <h2 className="text-base sm:text-md font-semibold mt-2">
                      22,000 $
                    </h2>
                    <p className="text-sm text-lightgray/80">lent</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* Monthly Budget Section: wider */}
          <div className="flex flex-col gap-6">
            <section className="border border-lightblue/10 bg-lightblue/3 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-4 w-full">
                <h2 className="text-lg md:text-xl font-medium">
                  Monthly budget
                </h2>
                <button
                  type="button"
                  className="hover:text-green cursor-pointer transition-colors"
                  aria-label="Edit monthly budget"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm sm:text-base text-lightgray/80">
                    Available budget
                  </p>
                  <h2 className="text-xl sm:text-2xl font-semibold mt-1">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(availableBudget)}
                  </h2>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-lightgray/80">Spent</p>
                  <h2 className="text-sm sm:text-base mt-1">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(spent)}
                  </h2>
                </div>
                {/* progress bar */}
                <div className="w-full bg-black/20 rounded-full h-4 mb-4">
                  <div
                    className="bg-green h-4 rounded-full transition-all"
                    style={{ width: `${percentUsed}%` }}
                  >
                    <span className="sr-only">
                      {percentUsed.toFixed(1)}% used
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-lightgray/80">
                    {percentUsed.toFixed(1)}% used
                  </p>
                  <h2 className="text-sm sm:text-base mt-1 text-lightgray/80">
                    Total:{" "}
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(totalBudget)}
                  </h2>
                </div>
              </div>
            </section>
            {/* Scheduled payments & current exchange */}

            <section className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
              <div className="bg-lightblue/3 border border-lightgray/10 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-4 w-full">
                  <h2 className="text-lg md:text-xl font-medium">
                    Scheduled payments
                  </h2>
                  <button
                    type="button"
                    className="hover:text-green cursor-pointer transition-colors"
                    aria-label="Edit scheduled payments"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap items-center justify-between bg-lightgray/5 px-2 py-3 rounded-md">
                    <div className="flex gap-3 items-center">
                      <div className="w-4 h-4 bg-green rounded-md" />
                      <div>
                        <h2>Rent</h2>
                        <p className="text-sm text-lightgray/80">June 1</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <h2 className="font-medium">20,000 $</h2>
                      <p className="text-sm text-green">Paid</p>
                    </div>
                  </div>
                  <div className="flex gap items-center justify-between bg-lightgray/5 px-2 py-3 rounded-md">
                    <div className="flex gap-3 items-center">
                      <div className="w-4 h-4 bg-green rounded-md" />
                      <div>
                        <h2>Rent</h2>
                        <p className="text-sm text-lightgray/80">June 1</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <h2 className="font-medium">20,000 $</h2>
                      <p className="text-sm text-green">Paid</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Current exchange */}

              <div className="bg-lightblue/3 border border-lightgray/10 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-4 w-full">
                  <h2 className="text-lg md:text-xl font-medium">
                    Current exchange
                  </h2>
                  <button
                    type="button"
                    className="hover:text-green cursor-pointer transition-colors"
                    aria-label="Edit monthly budget"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-start bg-lightgray/5 px-2 py-3 rounded-md">
                    <h2>1 USD = 42 $</h2>
                  </div>
                  <div className="flex items-center justify-start bg-lightgray/5 px-2 py-3 rounded-md">
                    <h2>1 USD = 42 $</h2>
                  </div>
                  <div className="flex items-center justify-start bg-lightgray/5 px-2 py-3 rounded-md">
                    <h2>1 USD = 42 $</h2>
                  </div>
                </div>
              </div>
              {/* Placeholder for additional content */}
            </section>
            {/* transactions section */}
            <section className="bg-lightblue/3 border border-lightblue/10 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-medium">Transactions</h2>
                <button
                  type="button"
                  className="hover:text-green cursor-pointer transition-colors"
                  aria-label="View all transactions"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-lightgray/5 rounded-md flex items-center justify-between px-2 py-3 mt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-2 bg-green text-black rounded-md w-fit">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-md text-medium">Apple</h2>
                    <p className="text-sm text-lightgray/80">from **** 1234</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <h2 className="text-base sm:text-md font-semibold mt-2">
                    - 1,200 $
                  </h2>
                  <p className="text-sm text-lightgray/80">17:20</p>
                </div>
              </div>
              <div className="bg-lightgray/5 rounded-md flex items-center justify-between px-2 py-3 mt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-2 bg-green text-black rounded-md w-fit">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-md text-medium">Apple</h2>
                    <p className="text-sm text-lightgray/80">from **** 1234</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <h2 className="text-base sm:text-md font-semibold mt-2">
                    - 1,200 $
                  </h2>
                  <p className="text-sm text-lightgray/80">17:20</p>
                </div>
              </div>
              <div className="bg-lightgray/5 rounded-md flex items-center justify-between px-2 py-3 mt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-2 bg-green text-black rounded-md w-fit">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-md text-medium">Apple</h2>
                    <p className="text-sm text-lightgray/80">from **** 1234</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <h2 className="text-base sm:text-md font-semibold mt-2">
                    - 1,200 $
                  </h2>
                  <p className="text-sm text-lightgray/80">17:20</p>
                </div>
              </div>
              <div className="bg-lightgray/5 rounded-md flex items-center justify-between px-2 py-3 mt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-2 bg-green text-black rounded-md w-fit">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-md text-medium">Apple</h2>
                    <p className="text-sm text-lightgray/80">from **** 1234</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <h2 className="text-base sm:text-md font-semibold mt-2">
                    - 1,200 $
                  </h2>
                  <p className="text-sm text-lightgray/80">17:20</p>
                </div>
              </div>
              <div className="bg-lightgray/5 rounded-md flex items-center justify-between px-2 py-3 mt-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center p-2 bg-green text-black rounded-md w-fit">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-md text-medium">Apple</h2>
                    <p className="text-sm text-lightgray/80">from **** 1234</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <h2 className="text-base sm:text-md font-semibold mt-2">
                    - 1,200 $
                  </h2>
                  <p className="text-sm text-lightgray/80">17:20</p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
