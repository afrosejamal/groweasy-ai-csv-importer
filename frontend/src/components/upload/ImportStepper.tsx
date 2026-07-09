interface ImportStepperProps {
  /** 0-indexed: 0 = Upload, 1 = Preview, 2 = Process, 3 = Complete */
  currentStep: number;
}

const steps = [
  { label: "Upload" },
  { label: "Preview" },
  { label: "Process" },
  { label: "Complete" },
];

export default function ImportStepper({ currentStep }: ImportStepperProps) {
  return (
    <ol className="flex items-center" aria-label="Import progress">
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <li key={step.label} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2.5">
              <span
                aria-current={isCurrent ? "step" : undefined}
                className={`flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-medium transition-colors ${
                  isComplete
                    ? "bg-primary text-primary-foreground"
                    : isCurrent
                      ? "border-2 border-primary text-primary"
                      : "border border-border text-muted-foreground"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`text-sm font-medium whitespace-nowrap ${
                  isCurrent || isComplete ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                aria-hidden="true"
                className={`mx-4 h-px flex-1 transition-colors ${
                  isComplete ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
