import { Check, X } from "lucide-react";

interface YesNoQuestionProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
  onSelect?: (value: boolean) => void; // Optional callback for auto-advance
  yesLabel?: string;
  noLabel?: string;
}

const YesNoQuestion = ({
  value,
  onChange,
  onSelect,
  yesLabel = "Yes",
  noLabel = "No",
}: YesNoQuestionProps) => {
  const handleSelect = (newValue: boolean) => {
    onChange(newValue);
    // Auto-advance after short delay for visual feedback
    if (onSelect) {
      setTimeout(() => onSelect(newValue), 400);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {/* Yes Button */}
      <button
        onClick={() => handleSelect(true)}
        className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 min-w-[140px] ${
          value === true
            ? "bg-primary text-primary-foreground shadow-lift scale-105"
            : "bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm border border-primary-foreground/30 hover:bg-primary-foreground/30 hover:scale-105"
        }`}
      >
        <Check
          className={`w-5 h-5 transition-transform ${
            value === true ? "scale-110" : "group-hover:scale-110"
          }`}
        />
        {yesLabel}
      </button>

      {/* No Button */}
      <button
        onClick={() => handleSelect(false)}
        className={`group flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 min-w-[140px] ${
          value === false
            ? "bg-muted text-foreground shadow-lift scale-105"
            : "bg-primary-foreground/20 text-primary-foreground backdrop-blur-sm border border-primary-foreground/30 hover:bg-primary-foreground/30 hover:scale-105"
        }`}
      >
        <X
          className={`w-5 h-5 transition-transform ${
            value === false ? "scale-110" : "group-hover:scale-110"
          }`}
        />
        {noLabel}
      </button>
    </div>
  );
};

export default YesNoQuestion;
