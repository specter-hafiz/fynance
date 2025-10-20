"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Image from "next/image";

type OnboardingType = "full" | "quick";

interface OnboardingOption {
  id: OnboardingType;
  title: string;
  description: string;
  route: string;
}

const ONBOARDING_OPTIONS: OnboardingOption[] = [
  {
    id: "full",
    title: "Full customization",
    description: "I have time, so let's set all the necessary information",
    route: "/profile-setup",
  },
  {
    id: "quick",
    title: "Quick start",
    description:
      "I want to start as soon as possible, let's skip all details for now",
    route: "/dashboard",
  },
];

const Welcome = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<OnboardingType | null>(
    "full"
  );

  // TODO: Get user data from auth context or props
  const userName = "Jeff Bezos"; // Replace with actual user data

  const handleContinue = () => {
    if (!selectedOption) return;

    const option = ONBOARDING_OPTIONS.find((opt) => opt.id === selectedOption);
    if (option) {
      router.push(option.route);
    }
  };

  return (
    <section>
      <div className="min-h-screen padding py-12 lg:py-8 flex flex-col lg:flex-row items-start justify-between gap-12">
        <div className="w-full max-w-2xl">
          <Logo />

          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold my-12 sm:my-16">
            Hello, {userName}!
          </h1>

          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-6">
            How would you like to start?
          </h2>

          <div
            className="space-y-4 mb-8"
            role="radiogroup"
            aria-label="Onboarding type"
          >
            {ONBOARDING_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={` border rounded-lg p-6 cursor-pointer flex items-center gap-4 w-full transition-all ${
                  selectedOption === option.id
                    ? "bg-green/20 border-green"
                    : "border-lightblue/10 bg-lightblue/5 hover:border-green/50"
                }`}
              >
                <input
                  type="radio"
                  name="onboardingType"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={(e) =>
                    setSelectedOption(e.target.value as OnboardingType)
                  }
                  className="sr-only"
                />

                {/* Custom radio indicator */}
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedOption === option.id
                      ? "border-green bg-green"
                      : "border-lightgray/30"
                  }`}
                >
                  {selectedOption === option.id && (
                    <div className="w-2 h-2 rounded-full bg-black/70" />
                  )}
                </div>

                <div className="flex flex-col items-start text-left">
                  <h3 className="font-semibold text-base sm:text-lg mb-1">
                    {option.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-lightgray/80">
                    {option.description}
                  </p>
                </div>
              </label>
            ))}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selectedOption}
            className="bg-green text-black py-4 px-12 rounded-full hover:opacity-90 font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>

          {!selectedOption && (
            <p className="text-xs text-lightgray/60 mt-4">
              Please select an option to continue
            </p>
          )}
        </div>

        {/* Illustration */}
        <div className="hidden lg:flex flex-1 max-w-lg items-center justify-center">
          <div className="relative w-full aspect-[4/3.8]">
            <Image
              src="/images/customization.png"
              alt="Onboarding customization illustration"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
