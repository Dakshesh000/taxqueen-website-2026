import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Globe,
  MapPin,
  Briefcase,
  DollarSign,
  Building,
  Laptop,
  Receipt,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Plane,
  Heart,
  MoreHorizontal,
  FileX,
  AlertTriangle,
  Bot,
  CheckCircle,
  Circle,
  CircleDashed,
  Loader2,
} from "lucide-react";

import QuestionWrapper from "@/components/quiz/QuestionWrapper";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizModal from "@/components/quiz/QuizModal";
import QuizResults from "@/components/quiz/QuizResults";
import YesNoQuestion from "@/components/quiz/questions/YesNoQuestion";
import TextInputQuestion from "@/components/quiz/questions/TextInputQuestion";
import MultiSelectQuestion from "@/components/quiz/questions/MultiSelectQuestion";
import SliderQuestion from "@/components/quiz/questions/SliderQuestion";
import ContactForm from "@/components/quiz/questions/ContactForm";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuiz } from "@/contexts/QuizContext";
import useImagePreloader from "@/hooks/useImagePreloader";
import TravelCompass from "@/components/quiz/TravelCompass";

// Import background images
import rvCoastalDrive from "@/assets/lifestyle/rv-coastal-drive.png";
import vanSnowMountains from "@/assets/lifestyle/van-snow-mountains.jpg";
import womanWorkingViews from "@/assets/lifestyle/woman-working-views.jpg";
import truckDesert from "@/assets/lifestyle/truck-desert.jpeg";
import workingAtBeach from "@/assets/lifestyle/working-at-beach.jpg";
import campingByRiver from "@/assets/lifestyle/camping-by-river.jpg";
import heatherHikingNature from "@/assets/lifestyle/heather-hiking-nature.jpg";
import sunsetRvReflection from "@/assets/lifestyle/sunset-rv-reflection.png";

// Array of all quiz background images for preloading
const QUIZ_BACKGROUND_IMAGES = [
  vanSnowMountains,
  rvCoastalDrive,
  womanWorkingViews,
  truckDesert,
  workingAtBeach,
  campingByRiver,
  heatherHikingNature,
  sunsetRvReflection,
];

// Quiz state interface
interface QuizAnswers {
  usTaxObligations: boolean | null;
  residence: string;
  incomeSources: string[];
  annualIncome: number;
  situations: string[];
  financialBehavior: string[];
  urgency: number;
  name: string;
  email: string;
  phone: string;
}

const TOTAL_STEPS = 8;

const GlobalQuiz = () => {
  const { isQuizOpen, prefillResidence, closeQuiz } = useQuiz();
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [isQualified, setIsQualified] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [answers, setAnswers] = useState<QuizAnswers>({
    usTaxObligations: null,
    residence: "",
    incomeSources: [],
    annualIncome: 2,
    situations: [],
    financialBehavior: [],
    urgency: 1,
    name: "",
    email: "",
    phone: "",
  });

  // Handle quiz open with prefill
  useEffect(() => {
    if (isQuizOpen) {
      // Reset quiz state when opening
      setShowResults(false);
      setIsQualified(false);
      setIsSubmitting(false);
      setSessionId(crypto.randomUUID());

      if (prefillResidence) {
        // Pre-fill residence and start at step 2
        setAnswers(prev => ({
          ...prev,
          residence: prefillResidence,
          usTaxObligations: null,
          incomeSources: [],
          annualIncome: 2,
          situations: [],
          financialBehavior: [],
          urgency: 1,
          name: "",
          email: "",
          phone: "",
        }));
        setCurrentStep(2);
      } else {
        // Reset to initial state
        setAnswers({
          usTaxObligations: null,
          residence: "",
          incomeSources: [],
          annualIncome: 2,
          situations: [],
          financialBehavior: [],
          urgency: 1,
          name: "",
          email: "",
          phone: "",
        });
        setCurrentStep(1);
      }
    }
  }, [isQuizOpen, prefillResidence]);

  // Options for questions
  const incomeOptions = [
    { id: "business", label: "Business Owner", icon: <Building className="w-5 h-5" /> },
    { id: "freelance", label: "Freelancer / Contractor", icon: <Laptop className="w-5 h-5" /> },
    { id: "1099", label: "1099 Income", icon: <Receipt className="w-5 h-5" /> },
    { id: "w2", label: "W-2 Employee", icon: <Briefcase className="w-5 h-5" /> },
    { id: "investments", label: "Investment Income", icon: <DollarSign className="w-5 h-5" /> },
    { id: "other", label: "Other", icon: <MoreHorizontal className="w-5 h-5" /> },
  ];

  const situationOptions = [
    { id: "expat", label: "I'm an expat / live outside US", icon: <Plane className="w-5 h-5" /> },
    { id: "planning", label: "Planning the nomad lifestyle", icon: <Globe className="w-5 h-5" /> },
    { id: "330days", label: "330+ days outside USA", icon: <Globe className="w-5 h-5" /> },
    { id: "multistate", label: "Worked in multiple states", icon: <MapPin className="w-5 h-5" /> },
    { id: "foreign", label: "Foreign bank accounts", icon: <DollarSign className="w-5 h-5" /> },
    { id: "badcpa", label: "Last CPA didn't understand my lifestyle", icon: <Heart className="w-5 h-5" /> },
    { id: "behindtaxes", label: "Behind on my taxes", icon: <Clock className="w-5 h-5" /> },
  ];

  const financialBehaviorOptions = [
    { id: "super-organized", label: "Super Organized", icon: <CheckCircle className="w-5 h-5" /> },
    { id: "somewhat-organized", label: "Somewhat Organized", icon: <Circle className="w-5 h-5" /> },
    { id: "unorganized", label: "Unorganized", icon: <CircleDashed className="w-5 h-5" /> },
    { id: "no-docs", label: "Don't document anything (Miles, Receipts)", icon: <FileX className="w-5 h-5" /> },
    { id: "no-ai", label: "Don't trust AI answers", icon: <Bot className="w-5 h-5" /> },
    { id: "messed-up", label: "Messed up Tax Situation", icon: <AlertTriangle className="w-5 h-5" /> },
  ];

  const incomeLabels = ["Under $40k", "$40k - $75k", "$75k - $150k", "$150k - $300k", "$300k - $500k", "$500k+"];
  const urgencyLabels = ["This week", "This month", "This quarter", "Not soon"];

  const goToNextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const saveResponse = async (questionKey: string, answerValue: unknown) => {
    if (!sessionId) return;
    
    try {
      await supabase.from("quiz_responses").insert({
        session_id: sessionId,
        question_key: questionKey,
        answer_value: answerValue as any,
      });
    } catch (err) {
      console.error("Error saving response:", err);
    }
  };

  const calculateScore = (): { score: number; qualified: boolean; reasons: string[] } => {
    let score = 0;
    const reasons: string[] = [];

    if (answers.usTaxObligations === true) {
      score += 20;
      reasons.push("Has US tax obligations");
    }

    const nomadSituations = ["expat", "planning", "330days"];
    const hasNomadSituation = answers.situations.some(s => nomadSituations.includes(s));
    if (hasNomadSituation) {
      score += 30;
      reasons.push("Nomad/expat lifestyle");
    }

    if (answers.annualIncome >= 3) {
      score += 20;
      reasons.push("Higher income bracket");
    }

    const businessIncome = ["business", "freelance", "1099"];
    if (answers.incomeSources.some(s => businessIncome.includes(s))) {
      score += 15;
      reasons.push("Business/self-employment income");
    }

    if (answers.urgency <= 1) {
      score += 10;
      reasons.push("Urgent timeline");
    }

    const qualified = answers.usTaxObligations === true && hasNomadSituation && score >= 50;

    return { score, qualified, reasons };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const responsePromises = [
        saveResponse("usTaxObligations", answers.usTaxObligations),
        saveResponse("residence", answers.residence),
        saveResponse("incomeSources", answers.incomeSources),
        saveResponse("annualIncome", answers.annualIncome),
        saveResponse("situations", answers.situations),
        saveResponse("financialBehavior", answers.financialBehavior),
        saveResponse("urgency", answers.urgency),
      ];
      await Promise.all(responsePromises);

      const { score, qualified, reasons } = calculateScore();

      const { error } = await supabase.from("quiz_leads").insert({
        session_id: sessionId,
        name: answers.name,
        email: answers.email,
        phone: answers.phone || null,
        is_qualified: qualified,
        qualification_score: score,
        qualification_reasons: reasons,
        status: "new",
      });

      if (error) {
        console.error("Error saving lead:", error);
        toast({
          title: "Submission Error",
          description: "There was a problem saving your information. Please try again.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      setIsQualified(qualified);
      setShowResults(true);
    } catch (err) {
      console.error("Error submitting quiz:", err);
      toast({
        title: "Submission Error", 
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAutoAdvance = () => {
    setTimeout(() => goToNextStep(), 400);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionWrapper
            title="Where are you residing currently?"
            subtitle="Your domicile state or country of residence."
            backgroundImage={vanSnowMountains}
          >
            <TextInputQuestion
              value={answers.residence}
              onChange={(val) => setAnswers({ ...answers, residence: val })}
              placeholder="e.g., Texas, Portugal, Thailand..."
              maxLength={50}
            />
            <div className="mt-5 flex justify-center gap-3">
              <Button
                className="rounded-full px-6"
                onClick={goToNextStep}
                disabled={!answers.residence.trim()}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </QuestionWrapper>
        );

      case 2:
        return (
          <QuestionWrapper
            title="Do you have US tax obligations?"
            helpText="US tax obligations apply to US citizens, green card holders, or anyone meeting the substantial presence test—including non-citizens with US-source income."
            backgroundImage={rvCoastalDrive}
          >
            <YesNoQuestion
              value={answers.usTaxObligations}
              onChange={(val) => setAnswers({ ...answers, usTaxObligations: val })}
              onSelect={handleAutoAdvance}
            />
            <div className="mt-5 flex justify-center gap-3">
              <Button
                variant="outline"
                className="rounded-full text-foreground border-muted-foreground/30 hover:bg-muted"
                onClick={goToPrevStep}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </QuestionWrapper>
        );

      case 3:
        return (
          <QuestionWrapper
            title="Income Sources?"
            subtitle="How do you make money? (Select all that apply)"
            helpText="Different income types have different tax treatments. Understanding your mix helps us optimize your strategy."
            backgroundImage={womanWorkingViews}
          >
            <MultiSelectQuestion
              options={incomeOptions}
              selected={answers.incomeSources}
              onChange={(val) => setAnswers({ ...answers, incomeSources: val })}
            />
            <div className="mt-5 flex justify-center gap-3">
              <Button
                variant="outline"
                className="rounded-full text-foreground border-muted-foreground/30 hover:bg-muted"
                onClick={goToPrevStep}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                className="rounded-full px-6"
                onClick={goToNextStep}
                disabled={answers.incomeSources.length === 0}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </QuestionWrapper>
        );

      case 4:
        return (
          <QuestionWrapper
            title="Annual Income?"
            subtitle="What's your approximate annual income?"
            helpText="This helps us understand which tax strategies will benefit you most."
            backgroundImage={truckDesert}
          >
            <SliderQuestion
              value={answers.annualIncome}
              onChange={(val) => setAnswers({ ...answers, annualIncome: val })}
              labels={incomeLabels}
            />
            <div className="mt-5 flex justify-center gap-3">
              <Button
                variant="outline"
                className="rounded-full text-foreground border-muted-foreground/30 hover:bg-muted"
                onClick={goToPrevStep}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button className="rounded-full px-6" onClick={goToNextStep}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </QuestionWrapper>
        );

      case 5:
        return (
          <QuestionWrapper
            title="Which of these apply to you?"
            subtitle="Select all that describe your tax situation"
            helpText="Each of these situations has specific tax implications we're experts at handling."
            backgroundImage={workingAtBeach}
          >
            <MultiSelectQuestion
              options={situationOptions}
              selected={answers.situations}
              onChange={(val) => setAnswers({ ...answers, situations: val })}
            />
            <div className="mt-5 flex justify-center gap-3">
              <Button
                variant="outline"
                className="rounded-full text-foreground border-muted-foreground/30 hover:bg-muted"
                onClick={goToPrevStep}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button className="rounded-full px-6" onClick={goToNextStep}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </QuestionWrapper>
        );

      case 6:
        return (
          <QuestionWrapper
            title="Describe your Financial Tracking and Tax Behavior?"
            subtitle="Select all that apply"
            backgroundImage={campingByRiver}
          >
            <MultiSelectQuestion
              options={financialBehaviorOptions}
              selected={answers.financialBehavior}
              onChange={(val) => setAnswers({ ...answers, financialBehavior: val })}
            />
            <div className="mt-5 flex justify-center gap-3">
              <Button
                variant="outline"
                className="rounded-full text-foreground border-muted-foreground/30 hover:bg-muted"
                onClick={goToPrevStep}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button className="rounded-full px-6" onClick={goToNextStep}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </QuestionWrapper>
        );

      case 7:
        return (
          <QuestionWrapper
            title="How quickly do you need this solved?"
            subtitle="What's your timeline?"
            backgroundImage={heatherHikingNature}
          >
            <SliderQuestion
              value={answers.urgency}
              onChange={(val) => setAnswers({ ...answers, urgency: val })}
              labels={urgencyLabels}
            />
            <div className="mt-5 flex justify-center gap-3">
              <Button
                variant="outline"
                className="rounded-full text-foreground border-muted-foreground/30 hover:bg-muted"
                onClick={goToPrevStep}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button className="rounded-full px-6" onClick={goToNextStep}>
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </QuestionWrapper>
        );

      case 8:
        return (
          <QuestionWrapper
            title="Almost There!"
            subtitle="Where should we send your results?"
            backgroundImage={sunsetRvReflection}
          >
            <ContactForm
              name={answers.name}
              email={answers.email}
              phone={answers.phone}
              onNameChange={(val) => setAnswers({ ...answers, name: val })}
              onEmailChange={(val) => setAnswers({ ...answers, email: val })}
              onPhoneChange={(val) => setAnswers({ ...answers, phone: val })}
            />
            <div className="mt-5 flex justify-center gap-3">
              <Button
                variant="outline"
                className="rounded-full text-foreground border-muted-foreground/30 hover:bg-muted"
                onClick={goToPrevStep}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                className="rounded-full px-6"
                onClick={handleSubmit}
                disabled={!answers.name.trim() || !answers.email.trim() || isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "See My Results"}
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </QuestionWrapper>
        );

      default:
        return null;
    }
  };

  // Preload all quiz background images when modal opens
  const imagesLoaded = useImagePreloader(isQuizOpen ? QUIZ_BACKGROUND_IMAGES : []);

  return (
    <QuizModal isOpen={isQuizOpen} onClose={closeQuiz}>
      <div className="flex flex-col h-full md:h-auto">
        {!showResults && (
          <QuizProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        )}
        
        {showResults ? (
          <QuizResults
            isQualified={isQualified}
            userName={answers.name}
            onClose={closeQuiz}
          />
        ) : !imagesLoaded ? (
          // Loading state while images preload
          <div className="relative min-h-[380px] md:min-h-[420px] w-full overflow-hidden md:rounded-2xl bg-muted flex flex-col items-center justify-center">
            <div className="mb-4 p-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 animate-pulse">
              <TravelCompass size="md" animate={true} />
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">Preparing your journey...</span>
            </div>
          </div>
        ) : (
          renderStep()
        )}
      </div>
    </QuizModal>
  );
};

export default GlobalQuiz;
