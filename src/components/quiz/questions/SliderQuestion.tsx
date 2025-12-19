import { Slider } from "@/components/ui/slider";

interface SliderQuestionProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  labels?: string[];
  formatValue?: (value: number) => string;
}

const SliderQuestion = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  labels,
  formatValue = (v) => `$${v.toLocaleString()}`,
}: SliderQuestionProps) => {
  // If labels are provided, use index-based value
  const displayValue = labels ? labels[value] : formatValue(value);

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Current Value Display */}
      <div className="text-center">
        <div className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-xl shadow-lift">
          {displayValue}
        </div>
      </div>

      {/* Slider */}
      <div className="px-4">
        <Slider
          value={[value]}
          onValueChange={(values) => onChange(values[0])}
          min={min}
          max={labels ? labels.length - 1 : max}
          step={step}
          className="w-full"
        />
      </div>

      {/* Min/Max Labels */}
      {labels ? (
        <div className="flex justify-between text-xs text-primary-foreground/70 px-2">
          <span>{labels[0]}</span>
          <span>{labels[labels.length - 1]}</span>
        </div>
      ) : (
        <div className="flex justify-between text-xs text-primary-foreground/70 px-2">
          <span>{formatValue(min)}</span>
          <span>{formatValue(max)}</span>
        </div>
      )}
    </div>
  );
};

export default SliderQuestion;
