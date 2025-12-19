import { Check } from "lucide-react";
import { ReactNode } from "react";

interface Option {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface MultiSelectQuestionProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxSelections?: number;
}

const MultiSelectQuestion = ({
  options,
  selected,
  onChange,
  maxSelections,
}: MultiSelectQuestionProps) => {
  const handleToggle = (optionId: string) => {
    if (selected.includes(optionId)) {
      onChange(selected.filter((id) => id !== optionId));
    } else {
      if (maxSelections && selected.length >= maxSelections) {
        // Replace the first selected with new one
        onChange([...selected.slice(1), optionId]);
      } else {
        onChange([...selected, optionId]);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      {maxSelections && (
        <p className="text-sm text-primary-foreground/70 text-center mb-4">
          Select up to {maxSelections} options
        </p>
      )}

      {options.map((option) => {
        const isSelected = selected.includes(option.id);

        return (
          <button
            key={option.id}
            onClick={() => handleToggle(option.id)}
            className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
              isSelected
                ? "bg-primary text-primary-foreground shadow-lift scale-[1.02]"
                : "bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm border border-primary-foreground/30 hover:bg-primary-foreground/30 hover:scale-[1.01]"
            }`}
          >
            {/* Checkbox Indicator */}
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                isSelected
                  ? "bg-primary-foreground text-primary"
                  : "bg-primary-foreground/20 border border-primary-foreground/40"
              }`}
            >
              {isSelected && <Check className="w-4 h-4" />}
            </div>

            {/* Icon */}
            {option.icon && (
              <span className="flex-shrink-0">{option.icon}</span>
            )}

            {/* Label */}
            <span className="font-medium text-left">{option.label}</span>
          </button>
        );
      })}

      {/* Selection Counter */}
      <p className="text-xs text-primary-foreground/60 text-center mt-4">
        {selected.length} selected
        {maxSelections && ` of ${maxSelections} max`}
      </p>
    </div>
  );
};

export default MultiSelectQuestion;
