import { useState } from "react";
import { Input } from "@/components/ui/input";

interface TextInputQuestionProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const TextInputQuestion = ({
  value,
  onChange,
  placeholder = "Type your answer...",
  maxLength = 100,
}: TextInputQuestionProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className={`relative transition-all duration-300 ${
          isFocused ? "scale-105" : ""
        }`}
      >
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full px-6 py-4 h-14 text-lg bg-primary-foreground/20 backdrop-blur-sm border-2 border-primary-foreground/30 rounded-full text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary focus:bg-primary-foreground/30 transition-all"
        />
        {value && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <span className="text-xs text-primary-foreground/60">
              {value.length}/{maxLength}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInputQuestion;
