"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { ArrowLeft, MoveRight, Check } from "lucide-react";
import Image from "next/image";

interface OnboardingStep {
  step: number;
  label: string;
  title: string;
  image: string;
}

interface SpaceData {
  id: number;
  name: string;
}

interface ExpenseData {
  id: number;
  title: string;
  description: string;
}

interface GoalData {
  id: number;
  title: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    step: 1,
    label: "Financial spaces",
    title: "Create separate spaces so that nothing gets confused",
    image: "/images/space.png",
  },
  {
    step: 2,
    label: "Expense tracking",
    title: "How would you like to track your expenses?",
    image: "/images/receipt.png",
  },
  {
    step: 3,
    label: "Currency",
    title: "Select your primary currency for transactions",
    image: "/images/currency.png",
  },
  {
    step: 4,
    label: "Your goal",
    title: "What's important to you right now? Let's set the goal",
    image: "/images/goals.png",
  },
];

const SPACES_DATA: SpaceData[] = [
  { id: 1, name: "Personal" },
  { id: 2, name: "Work" },
  { id: 3, name: "Savings" },
  { id: 4, name: "Investments" },
];

const EXPENSES_DATA: ExpenseData[] = [
  {
    id: 1,
    title: "Automatically",
    description: "I want transactions streamed automatically from my bank.",
  },
  {
    id: 2,
    title: "Manually",
    description: "I will enter my expenses manually throughout the month.",
  },
];

const GOALS_DATA: GoalData[] = [
  { id: 1, title: "Pay off debt" },
  { id: 2, title: "Travel" },
  { id: 3, title: "Stop living pay-check to pay-check" },
  { id: 4, title: "Control my money" },
  { id: 5, title: "Save money" },
];

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "₵" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
];

const ProfileSetup = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSpaces, setSelectedSpaces] = useState<number[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const totalSteps = ONBOARDING_STEPS.length;
  const currentStepData = ONBOARDING_STEPS.find((s) => s.step === currentStep);

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedSpaces.length > 0;
      case 2:
        return selectedExpense !== null;
      case 3:
        return selectedCurrency !== "";
      case 4:
        return selectedGoal !== null;
      default:
        return true;
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/onboarding/welcome");
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!canProceed()) {
      return; // Validation: can't proceed without selection
    }

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Last step - submit data and go to dashboard
      const onboardingData = {
        spaces: selectedSpaces,
        expenseTracking: selectedExpense,
        currency: selectedCurrency,
        goal: selectedGoal,
      };
      console.log("Onboarding data:", onboardingData);
      // TODO: Send to API
      router.push("/dashboard");
    }
  };

  const toggleSpace = (spaceId: number) => {
    setSelectedSpaces((prev) =>
      prev.includes(spaceId)
        ? prev.filter((id) => id !== spaceId)
        : [...prev, spaceId]
    );
  };

  return (
    <section>
      <div className="min-h-screen padding py-10 lg:py-4">
        <div className="w-full max-w-7xl mx-auto">
          <Logo />

          {/* Header with Back button and Progress */}
          <div className="my-8 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="inline-flex gap-2 items-center text-lightgray/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Back
            </button>

            {/* Desktop Progress Steps */}
            <div className="hidden lg:flex items-center gap-3">
              {ONBOARDING_STEPS.map((step, index) => (
                <div key={step.step} className="flex items-center gap-6">
                  <div className="flex gap-4 items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        currentStep === step.step
                          ? "border-green bg-green/20"
                          : currentStep > step.step
                          ? "border-green bg-green"
                          : "border-lightgray/30"
                      }`}
                    >
                      {currentStep > step.step ? (
                        <span className="font-bold text-black text-sm">✓</span>
                      ) : (
                        <span
                          className={`font-bold text-sm ${
                            currentStep === step.step
                              ? "text-green"
                              : "text-lightgray/50"
                          }`}
                        >
                          {step.step}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-sm hidden xl:block ${
                        currentStep === step.step
                          ? "text-white"
                          : "text-lightgray/60"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {index < ONBOARDING_STEPS.length - 1 && (
                    <MoveRight className="text-lightgray/30" size={16} />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Progress Indicator */}
            <div className="flex lg:hidden items-center gap-2">
              <span className="text-sm text-lightgray/80">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
          </div>

          {/* Step Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold max-w-3xl mb-8">
                {currentStepData?.title}
              </h1>

              {/* Step 1: Financial Spaces (Multi-select) */}
              {currentStep === 1 && (
                <div
                  role="group"
                  aria-label="Select financial spaces"
                  className="space-y-4"
                >
                  {SPACES_DATA.map((space) => (
                    <label
                      key={space.id}
                      className={`border rounded-lg p-6 cursor-pointer flex items-center gap-4 transition-all ${
                        selectedSpaces.includes(space.id)
                          ? "bg-green/20 border-green"
                          : "bg-lightblue/5 border-lightblue/10 hover:border-green/50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSpaces.includes(space.id)}
                        onChange={() => toggleSpace(space.id)}
                        className="sr-only"
                      />
                      {/* Custom checkbox indicator */}
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                          selectedSpaces.includes(space.id)
                            ? "bg-green border-green"
                            : "border-lightgray/30"
                        }`}
                      >
                        {selectedSpaces.includes(space.id) && (
                          <Check className="w-4 h-4 text-black" />
                        )}
                      </div>
                      <h3 className="text-base sm:text-md font-medium">
                        {space.name}
                      </h3>
                    </label>
                  ))}
                </div>
              )}

              {/* Step 2: Expense Tracking (Radio) */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  {EXPENSES_DATA.map((expense) => (
                    <label
                      key={expense.id}
                      className={`border rounded-lg p-6 cursor-pointer flex items-start gap-4 transition-all ${
                        selectedExpense === expense.title
                          ? "bg-green/20 border-green"
                          : "bg-lightblue/5 border-lightblue/10 hover:border-green/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="expenseTracking"
                        value={expense.title}
                        checked={selectedExpense === expense.title}
                        onChange={(e) => setSelectedExpense(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all mt-0.5 ${
                          selectedExpense === expense.title
                            ? "bg-green border-green"
                            : "border-lightgray/30"
                        }`}
                      >
                        {selectedExpense === expense.title && (
                          <div className="w-2 h-2 rounded-full bg-black" />
                        )}
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <h3 className="text-base sm:text-md font-semibold mb-1">
                          {expense.title}
                        </h3>
                        <p className="text-sm text-lightgray/80">
                          {expense.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Step 3: Currency (Select) */}
              {currentStep === 3 && (
                <div>
                  <div className="relative w-full">
                    <select
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                      className="w-full bg-lightblue/5 border border-lightblue/10 rounded-lg py-4 pl-6 pr-12 text-white focus:outline-none focus:border-green transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-black text-white">
                        Choose your currency
                      </option>
                      {CURRENCIES.map((currency) => (
                        <option
                          key={currency.code}
                          value={currency.code}
                          className="bg-black text-white"
                        >
                          {currency.symbol} {currency.name} ({currency.code})
                        </option>
                      ))}
                    </select>

                    {/* Custom Arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-lightgray/60 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Goals (Radio) */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  {GOALS_DATA.map((goal) => (
                    <label
                      key={goal.id}
                      className={`border rounded-lg p-6 cursor-pointer flex items-center gap-4 transition-all ${
                        selectedGoal === goal.title
                          ? "bg-green/20 border-green"
                          : "bg-lightblue/5 border-lightblue/10 hover:border-green/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="goal"
                        value={goal.title}
                        checked={selectedGoal === goal.title}
                        onChange={(e) => setSelectedGoal(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          selectedGoal === goal.title
                            ? "bg-green border-green"
                            : "border-lightgray/30"
                        }`}
                      >
                        {selectedGoal === goal.title && (
                          <div className="w-2 h-2 rounded-full bg-black" />
                        )}
                      </div>
                      <h3 className="text-base sm:text-md font-medium">
                        {goal.title}
                      </h3>
                    </label>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mt-8">
                <div className="flex gap-3 order-1 sm:order-2">
                  {currentStep > 1 && (
                    <button
                      onClick={handleBack}
                      className="flex-1 sm:flex-none border border-lightblue/20 py-3 px-8 rounded-full text-white text-sm font-medium hover:bg-lightblue/5 transition-all"
                    >
                      Previous
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex-1 sm:flex-none bg-green py-3 px-8 rounded-full text-black text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentStep === totalSteps ? "Finish" : "Continue"}
                  </button>
                </div>
              </div>

              {!canProceed() && (
                <p className="text-xs text-red-500 mt-4 text-center sm:text-right">
                  Please make a selection to continue
                </p>
              )}
            </div>

            {/* Illustration */}
            <div className="hidden lg:block flex-1 max-w-lg">
              <div className="relative w-full max-w-md aspect-square">
                <Image
                  src={currentStepData?.image || "/images/profile-setup.png"}
                  alt={`${currentStepData?.label} illustration`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSetup;
