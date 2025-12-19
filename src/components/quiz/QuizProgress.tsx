import { MapPin, Flag } from "lucide-react";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress = ({ currentStep, totalSteps }: QuizProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full px-4 py-6">
      {/* Journey Path */}
      <div className="relative">
        {/* Background Road */}
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          {/* Progress Fill */}
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Journey Markers */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between">
          {/* Start Marker */}
          <div className="relative -ml-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                currentStep >= 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <MapPin className="w-3 h-3" />
            </div>
          </div>

          {/* Step Dots */}
          {Array.from({ length: totalSteps - 1 }).map((_, index) => {
            const stepNumber = index + 2;
            const isCompleted = currentStep >= stepNumber;
            const isCurrent = currentStep === stepNumber;

            return (
              <div key={index} className="relative">
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    isCompleted
                      ? "bg-primary scale-100"
                      : isCurrent
                      ? "bg-primary/50 scale-110 ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : "bg-muted scale-75"
                  }`}
                />
              </div>
            );
          })}

          {/* Finish Flag */}
          <div className="relative -mr-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                currentStep === totalSteps
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <Flag className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Step Counter */}
      <div className="mt-4 text-center">
        <span className="text-sm text-muted-foreground">
          Stop{" "}
          <span className="font-semibold text-primary">{currentStep}</span> of{" "}
          {totalSteps}
        </span>
      </div>
    </div>
  );
};

export default QuizProgress;
