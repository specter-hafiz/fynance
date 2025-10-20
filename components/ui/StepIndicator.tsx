import React from "react";
import { MoveRight } from "lucide-react";

interface Step {
  step: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  showLabels?: boolean;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  showLabels = true,
}) => {
  return (
    <div className="flex items-center gap-3">
      {steps.map((step, index) => (
        <div key={step.step} className="flex items-center gap-3">
          <div className="flex gap-2 items-center">
            {/* Step Circle */}
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
                <span className="font-bold text-green text-sm">✓</span>
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

            {/* Step Label */}
            {showLabels && (
              <p
                className={`text-sm ${
                  currentStep === step.step ? "text-white" : "text-lightgray/60"
                }`}
              >
                {step.label}
              </p>
            )}
          </div>

          {/* Arrow between steps */}
          {index < steps.length - 1 && (
            <MoveRight className="text-lightgray/30" size={16} />
          )}
        </div>
      ))}
    </div>
  );
};
