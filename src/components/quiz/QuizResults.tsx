import { Button } from "@/components/ui/button";
import { Sparkles, MapPin, Download, Calendar } from "lucide-react";
import TravelCompass from "./TravelCompass";

interface QuizResultsProps {
  isQualified: boolean;
  userName: string;
  onClose: () => void;
}

const QuizResults = ({ isQualified, userName, onClose }: QuizResultsProps) => {
  if (isQualified) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] p-6 text-center">
        {/* Celebration Icon */}
        <div className="mb-6 p-4 rounded-full bg-primary/20 animate-pulse">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
          🎉 You're a Perfect Fit{userName ? `, ${userName}` : ""}!
        </h2>

        <p className="text-muted-foreground mb-8 max-w-md">
          Based on your answers, we specialize in exactly your situation. 
          Book a free discovery call to discuss your tax strategy.
        </p>

        {/* Calendar Embed */}
        <div className="w-full max-w-lg bg-muted/30 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-medium text-foreground">Book Your Free Call</span>
          </div>
          <iframe
            src="https://bookme.name/embed/widget/4573/PkkmsRgxM6nqOnUWU19ErYrgjwUnFdCG9FxGCRAmDRfX8SgQudeXGIPa1h36"
            width="100%"
            height="400"
            frameBorder="0"
            className="rounded-lg"
            title="Book a discovery call with Tax Queen"
          />
        </div>

        <Button
          variant="ghost"
          className="text-muted-foreground"
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    );
  }

  // Not a fit / Non-qualified path
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] p-6 text-center">
      {/* Compass Icon */}
      <div className="mb-6 p-4 rounded-full bg-muted">
        <TravelCompass size="lg" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
        You're on a Different Path
      </h2>

      <p className="text-muted-foreground mb-8 max-w-md">
        Thanks for taking the quiz{userName ? `, ${userName}` : ""}! Based on your answers, 
        you may not need our specialized nomad tax services right now. 
        But we've got something for you!
      </p>

      {/* Free Resource CTA */}
      <div className="w-full max-w-sm space-y-4">
        <Button className="w-full gap-2 rounded-full" size="lg">
          <Download className="w-5 h-5" />
          Get Your Free Tax Write-Off Checklist
        </Button>

        <p className="text-xs text-muted-foreground">
          Our comprehensive guide to deductions for remote workers and travelers.
        </p>
      </div>

      <Button
        variant="ghost"
        className="text-muted-foreground mt-6"
        onClick={onClose}
      >
        Close
      </Button>
    </div>
  );
};

export default QuizResults;
