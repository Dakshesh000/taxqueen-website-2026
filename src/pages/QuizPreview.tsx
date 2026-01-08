import { useEffect } from "react";
import { useQuiz } from "@/contexts/QuizContext";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const QuizPreview = () => {
  const { openQuiz } = useQuiz();

  // Auto-open quiz when page loads
  useEffect(() => {
    openQuiz();
  }, [openQuiz]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-3">
            Tax Queen Quiz
          </h1>
          <p className="text-primary-foreground/80">
            Find the perfect tax solution for your nomad lifestyle
          </p>
        </div>
      </div>

      {/* Fallback content if modal is closed */}
      <div className="max-w-2xl mx-auto py-16 px-6 text-center">
        <div className="bg-card rounded-2xl shadow-md p-8 space-y-6">
          <h2 className="text-2xl font-bold text-foreground">
            Find Your Perfect Tax Solution
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Answer a few quick questions and we'll match you with the right service for your nomad lifestyle.
          </p>
          <Button
            size="lg"
            className="rounded-full px-8"
            onClick={() => openQuiz()}
          >
            Start the Quiz
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;
