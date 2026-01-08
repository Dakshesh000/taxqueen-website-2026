import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface ExpatQuestionProps {
  value: string;
  isExpat: boolean;
  onChange: (value: string, isExpat: boolean) => void;
  onNotExpat: () => void;
}

const ExpatQuestion = ({
  value,
  isExpat,
  onChange,
  onNotExpat,
}: ExpatQuestionProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleNotExpat = () => {
    onChange("", false);
    onNotExpat();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Text Input */}
      <div
        className={`relative transition-all duration-300 ${
          isFocused ? "scale-105" : ""
        }`}
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground/60">
          <MapPin className="w-5 h-5" />
        </div>
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value, true)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Country or visa location..."
          maxLength={50}
          className="w-full pl-12 pr-6 py-4 h-14 text-lg bg-primary-foreground/20 backdrop-blur-sm border-2 border-primary-foreground/30 rounded-full text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary focus:bg-primary-foreground/30 transition-all"
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-primary-foreground/30" />
        <span className="text-sm text-primary-foreground/70">or</span>
        <div className="flex-1 h-px bg-primary-foreground/30" />
      </div>

      {/* Not an Expat Button */}
      <Button
        variant="outline"
        onClick={handleNotExpat}
        className="w-full rounded-full py-4 h-14 text-lg border-2 border-primary-foreground/30 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-all"
      >
        Not an Expat
      </Button>
    </div>
  );
};

export default ExpatQuestion;
