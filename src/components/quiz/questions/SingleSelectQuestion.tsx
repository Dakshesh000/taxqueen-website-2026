import { ReactNode } from "react";

interface Option {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
}

interface SingleSelectQuestionProps {
  options: Option[];
  selected: string | null;
  onChange: (value: string) => void;
  onSelect?: (value: string) => void; // Optional callback for auto-advance
}

const SingleSelectQuestion = ({
  options,
  selected,
  onChange,
  onSelect,
}: SingleSelectQuestionProps) => {
  const handleSelect = (optionId: string) => {
    onChange(optionId);
    // Auto-advance after short delay for visual feedback
    if (onSelect) {
      setTimeout(() => onSelect(optionId), 400);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {options.map((option) => {
        const isSelected = selected === option.id;

        return (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
              isSelected
                ? "bg-primary text-primary-foreground shadow-lift scale-[1.02]"
                : "bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm border border-primary-foreground/30 hover:bg-primary-foreground/30 hover:scale-[1.01]"
            }`}
          >
            {/* Radio Indicator */}
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                isSelected
                  ? "bg-primary-foreground"
                  : "bg-primary-foreground/20 border-2 border-primary-foreground/40"
              }`}
            >
              {isSelected && (
                <div className="w-3 h-3 rounded-full bg-primary" />
              )}
            </div>

            {/* Icon */}
            {option.icon && (
              <span className="flex-shrink-0">{option.icon}</span>
            )}

            {/* Content */}
            <div className="text-left">
              <span className="font-medium block">{option.label}</span>
              {option.description && (
                <span className="text-sm opacity-80">{option.description}</span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default SingleSelectQuestion;
