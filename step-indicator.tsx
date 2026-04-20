import { Check } from "lucide-react";

export function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = ["Details", "Plan", "Payment"];

  return (
    <div className="flex items-center justify-between mb-8 px-2">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isComplete = currentStep > stepNum;
        const isActive = currentStep === stepNum;

        return (
          <div key={label} className="flex items-center gap-3">
            <div
              className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                isComplete ? "bg-emerald-500 text-white" : 
                isActive ? "bg-[#F7931A] text-black scale-110 shadow-[0_0_15px_rgba(247,147,26,0.4)]" : 
                "bg-white/10 text-gray-500"
              }`}
            >
              {isComplete ? <Check className="h-4 w-4" /> : stepNum}
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest hidden sm:block ${isActive ? "text-white" : "text-gray-500"}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}