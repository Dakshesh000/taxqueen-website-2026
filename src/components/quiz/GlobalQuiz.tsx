import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Building,
  Laptop,
  Briefcase,
  DollarSign,
  Wallet,
  MoreHorizontal,
  MapPin,
  Globe,
  Plane,
  HelpCircle,
  AlertTriangle,
  Shuffle,
  AlertCircle,
  UserX,
  Bot,
  CheckCircle,
  Circle,
  CircleDashed,
  FileX,
  FileText,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import QuestionWrapper from "@/components/quiz/QuestionWrapper";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizModal from "@/components/quiz/QuizModal";
import QuizResults from "@/components/quiz/QuizResults";
import MultiSelectQuestion from "@/components/quiz/questions/MultiSelectQuestion";
import SingleSelectQuestion from "@/components/quiz/questions/SingleSelectQuestion";
import SliderQuestion from "@/components/quiz/questions/SliderQuestion";
import ContactForm from "@/components/quiz/questions/ContactForm";
import ExpatQuestion from "@/components/quiz/questions/ExpatQuestion";
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
  incomeSources: string[];
  expatCountry: string;
  isExpat: boolean;
  situations: string[];
  financialTracking: string | null;
  lookingFor: string[];
  urgency: number;
  name: string;
  email: string;
  phone: string;
}

const TOTAL_STEPS = 8;

interface GlobalQuizProps {
  isEmbedded?: boolean;
}

const GlobalQuiz = ({ isEmbedded = false }: GlobalQuizProps) => {
  const { isQuizOpen, prefillUsTax, closeQuiz } = useQuiz();
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isQualified, setIsQualified] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [answers, setAnswers] = useState<QuizAnswers>({
    usTaxObligations: null,
    incomeSources: [],
    expatCountry: "",
    isExpat: true,
    situations: [],
    financialTracking: null,
    lookingFor: [],
    urgency: 0,
    name: "",
    email: "",
    phone: "",
  });

  // Handle quiz open with prefill from hero
  useEffect(() => {
    if (isQuizOpen) {
      // Reset quiz state when opening
      setShowResults(false);
      setIsQualified(false);
      setIsSubmitting(false);
      setSessionId(crypto.randomUUID());

      if (prefillUsTax === "usTaxYes") {
        // User answered Yes to US Tax - start at step 1 (income sources)
        setAnswers({
          usTaxObligations: true,
          incomeSources: [],
          expatCountry: "",
          isExpat: true,
          situations: [],
          financialTracking: null,
          lookingFor: [],
          urgency: 0,
          name: "",
          email: "",
          phone: "",
        });
        setCurrentStep(1);
      } else if (prefillUsTax === "usTaxNo") {
        // User answered No - they're not qualified, show results immediately
        setAnswers({
          usTaxObligations: false,
          incomeSources: [],
          expatCountry: "",
          isExpat: true,
          situations: [],
          financialTracking: null,
          lookingFor: [],
          urgency: 0,
          name: "",
          email: "",
          phone: "",
        });
        setIsQualified(false);
        setShowResults(true);
      } else {
        // No prefill - start at step 0 (US Tax question)
        setAnswers({
          usTaxObligations: null,
          incomeSources: [],
          expatCountry: "",
          isExpat: true,
          situations: [],
          financialTracking: null,
          lookingFor: [],
          urgency: 0,
          name: "",
          email: "",
          phone: "",
        });
        setCurrentStep(0);
      }
    }
  }, [isQuizOpen, prefillUsTax]);

  // Options for questions
  const incomeOptions = [
    { id: "business-freelance-1099", label: "Business Owner / Freelancing / Contract (1099)", icon: <Laptop className="w-5 h-5" /> },
    { id: "w2", label: "W-2 Employee", icon: <Briefcase className="w-5 h-5" /> },
    { id: "rental", label: "Rental Income", icon: <Building className="w-5 h-5" /> },
    { id: "investments", label: "Investments", icon: <DollarSign className="w-5 h-5" /> },
    { id: "retirement", label: "Retirement/SS/Pension", icon: <Wallet className="w-5 h-5" /> },
    { id: "other", label: "Other", icon: <MoreHorizontal className="w-5 h-5" /> },
  ];

  const situationOptions = [
    { id: "multistate", label: "I've worked or earned income in multiple states", icon: <MapPin className="w-5 h-5" /> },
    { id: "330days", label: "I spend over 330 days outside the USA in a year", icon: <Globe className="w-5 h-5" /> },
    { id: "visa-abroad", label: "I have a visa to live outside of the USA", icon: <Plane className="w-5 h-5" /> },
    { id: "unsure-deductions", label: "I'm unsure what I can deduct", icon: <HelpCircle className="w-5 h-5" /> },
    { id: "tax-averse", label: "I am highly averse to paying taxes", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: "mixed-expenses", label: "I mix personal and business expenses sometimes", icon: <Shuffle className="w-5 h-5" /> },
    { id: "worried-mistakes", label: "I worry about doing something wrong", icon: <AlertCircle className="w-5 h-5" /> },
    { id: "bad-accountant", label: "My last accountant didn't provide the customer service I was hoping for", icon: <UserX className="w-5 h-5" /> },
    { id: "no-ai-trust", label: "I don't trust AI to give me the relevant guidance for my tax situation", icon: <Bot className="w-5 h-5" /> },
  ];

  const financialTrackingOptions = [
    { id: "super-organized", label: "Super organized", icon: <CheckCircle className="w-5 h-5" /> },
    { id: "pretty-organized", label: "Pretty organized", icon: <Circle className="w-5 h-5" /> },
    { id: "somewhat-unorganized", label: "Somewhat unorganized", icon: <CircleDashed className="w-5 h-5" /> },
    { id: "very-unorganized", label: "Very unorganized", icon: <FileX className="w-5 h-5" /> },
    { id: "no-documentation", label: "I don't document miles and never save receipts", icon: <FileX className="w-5 h-5" /> },
  ];

  const lookingForOptions = [
    { id: "current-filing", label: "Need help with the current filing", icon: <FileText className="w-5 h-5" /> },
    { id: "unfiled-years", label: "Haven't filed in years", icon: <Calendar className="w-5 h-5" /> },
    { id: "questions", label: "Have lots of questions", icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const urgencyLabels = ["This Month", "This Quarter", "This Year", "Not Anytime Soon"];

  const goToNextStep = () => {
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
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

  const calculateQualification = (): { qualified: boolean; reasons: string[] } => {
    const reasons: string[] = [];
    
    // Disqualifier 1: No US Tax Obligations
    if (answers.usTaxObligations === false) {
      reasons.push("No US tax obligations");
      return { qualified: false, reasons };
    }
    
    // Disqualifier 2: Tax averse AND (very unorganized OR no documentation)
    const isTaxAverse = answers.situations.includes("tax-averse");
    const isVeryUnorganized = answers.financialTracking === "very-unorganized";
    const hasNoDocumentation = answers.financialTracking === "no-documentation";
    
    if (isTaxAverse && (isVeryUnorganized || hasNoDocumentation)) {
      reasons.push("Not a good fit based on tax attitude and organization level");
      return { qualified: false, reasons };
    }
    
    // Qualified
    reasons.push("Good fit for services");
    return { qualified: true, reasons };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const responsePromises = [
        saveResponse("usTaxObligations", answers.usTaxObligations),
        saveResponse("incomeSources", answers.incomeSources),
        saveResponse("expatCountry", answers.expatCountry),
        saveResponse("isExpat", answers.isExpat),
        saveResponse("situations", answers.situations),
        saveResponse("financialTracking", answers.financialTracking),
        saveResponse("lookingFor", answers.lookingFor),
        saveResponse("urgency", answers.urgency),
      ];
      await Promise.all(responsePromises);

      const { qualified, reasons } = calculateQualification();

      const { error } = await supabase.from("quiz_leads").insert({
        session_id: sessionId,
        name: answers.name,
        email: answers.email,
        phone: answers.phone || null,
        is_qualified: qualified,
        qualification_score: qualified ? 100 : 0,
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
      case 0:
        return (
          <QuestionWrapper
            title="Do you have US Tax Obligations?"
            subtitle="US citizens, green card holders, and those with US income"
            backgroundImage={heatherHikingNature}
          >
            <div className="flex flex-col gap-4 items-center max-w-xs mx-auto">
              <Button
                className="w-full rounded-full h-12 text-base"
                onClick={() => {
                  setAnswers({ ...answers, usTaxObligations: true });
                  setCurrentStep(1);
                }}
              >
                Yes
              </Button>
              <Button
                variant="outline"
                className="w-full rounded-full h-12 text-base border-2 border-foreground text-foreground hover:bg-muted"
                onClick={() => {
                  setAnswers({ ...answers, usTaxObligations: false });
                  setIsQualified(false);
                  setShowResults(true);
                }}
              >
                No
              </Button>
            </div>
          </QuestionWrapper>
        );

      case 1:
        return (
          <QuestionWrapper
            title="How do you make money right now?"
            subtitle="Select all that apply"
            backgroundImage={vanSnowMountains}
          >
            <MultiSelectQuestion
              options={incomeOptions}
              selected={answers.incomeSources}
              onChange={(val) => setAnswers({ ...answers, incomeSources: val })}
            />
            <div className="mt-5 flex justify-center gap-3">
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

      case 2:
        return (
          <QuestionWrapper
            title="If an expat, what country is your residence or visa in?"
            backgroundImage={rvCoastalDrive}
          >
            <ExpatQuestion
              value={answers.expatCountry}
              isExpat={answers.isExpat}
              onChange={(val, isExpat) => setAnswers({ ...answers, expatCountry: val, isExpat })}
              onNotExpat={handleAutoAdvance}
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
              {answers.expatCountry.trim() && (
                <Button
                  className="rounded-full px-6"
                  onClick={goToNextStep}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </QuestionWrapper>
        );

      case 3:
        return (
          <QuestionWrapper
            title="Which of these applies to you?"
            subtitle="Select all that apply"
            backgroundImage={womanWorkingViews}
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

      case 4:
        return (
          <QuestionWrapper
            title="How would you describe yourself when it comes to financial tracking and taxes?"
            backgroundImage={truckDesert}
          >
            <SingleSelectQuestion
              options={financialTrackingOptions}
              selected={answers.financialTracking}
              onChange={(val) => setAnswers({ ...answers, financialTracking: val })}
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

      case 5:
        return (
          <QuestionWrapper
            title="What are you looking for right now?"
            subtitle="Select all that apply"
            backgroundImage={workingAtBeach}
          >
            <MultiSelectQuestion
              options={lookingForOptions}
              selected={answers.lookingFor}
              onChange={(val) => setAnswers({ ...answers, lookingFor: val })}
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
                disabled={answers.lookingFor.length === 0}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </QuestionWrapper>
        );

      case 6:
        return (
          <QuestionWrapper
            title="How fast do you need help?"
            backgroundImage={campingByRiver}
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

      case 7:
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

  // Preload all quiz background images when modal opens or when embedded
  const shouldPreload = isEmbedded || isQuizOpen;
  const imagesLoaded = useImagePreloader(shouldPreload ? QUIZ_BACKGROUND_IMAGES : []);

  // For embedded mode, always show and handle close differently
  const isOpen = isEmbedded || isQuizOpen;
  const handleClose = isEmbedded ? () => setShowResults(false) : closeQuiz;

  // Initialize embedded quiz
  useEffect(() => {
    if (isEmbedded && !sessionId) {
      setSessionId(crypto.randomUUID());
    }
  }, [isEmbedded, sessionId]);

  const quizContent = (
    <div className="flex flex-col h-full md:h-auto">
      {!showResults && currentStep > 0 && (
        <QuizProgress currentStep={currentStep} totalSteps={TOTAL_STEPS - 1} />
      )}
      
      {showResults ? (
        <QuizResults
          isQualified={isQualified}
          userName={answers.name}
          onClose={handleClose}
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
  );

  // For embedded mode, render directly without modal
  if (isEmbedded) {
    return quizContent;
  }

  return (
    <QuizModal isOpen={isQuizOpen} onClose={closeQuiz}>
      {quizContent}
    </QuizModal>
  );
};

export default GlobalQuiz;
