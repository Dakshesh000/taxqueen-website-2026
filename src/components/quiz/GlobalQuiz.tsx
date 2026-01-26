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
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Compass,
  Heart,
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
// Formspree endpoint for quiz submissions
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xojdevbj";
import { useToast } from "@/hooks/use-toast";
import { useQuiz } from "@/contexts/QuizContext";
import useImagePreloader from "@/hooks/useImagePreloader";

// Import background images
import rvCoastalDrive from "@/assets/lifestyle/rv-coastal-drive.png";
import vanSnowMountains from "@/assets/lifestyle/van-snow-mountains.jpg";
import womanWorkingViews from "@/assets/lifestyle/woman-working-views.jpg";
import truckDesert from "@/assets/lifestyle/truck-desert.jpeg";
import workingAtBeach from "@/assets/lifestyle/working-at-beach.jpg";
import campingByRiver from "@/assets/lifestyle/camping-by-river.jpg";
import heatherHikingNature from "@/assets/lifestyle/heather-hiking-nature.jpg";
import sunsetRvReflection from "@/assets/lifestyle/sunset-rv-reflection.png";
import rvAutumnLeaves from "@/assets/lifestyle/rv-autumn-leaves.jpg";

// Import LQIP placeholders for blur-up effect
import {
  heatherHikingNaturePlaceholder,
  vanSnowMountainsPlaceholder,
  rvCoastalDrivePlaceholder,
  womanWorkingViewsPlaceholder,
  truckDesertPlaceholder,
  workingAtBeachPlaceholder,
  campingByRiverPlaceholder,
  sunsetRvReflectionPlaceholder,
} from "@/assets/placeholders/quiz-placeholders";

// Array of all quiz background images for preloading (background preload for smoother steps)
const QUIZ_BACKGROUND_IMAGES = [
  vanSnowMountains,
  rvCoastalDrive,
  womanWorkingViews,
  truckDesert,
  workingAtBeach,
  campingByRiver,
  heatherHikingNature,
  sunsetRvReflection,
  rvAutumnLeaves,
];

// Quiz state interface
interface QuizAnswers {
  usTaxObligations: boolean | null;
  incomeSources: string[];
  expatCountry: string;
  isExpat: boolean;
  nomadicLife: string[];
  situations: string[];
  financialTracking: string | null;
  lookingFor: string[];
  urgency: number;
  name: string;
  email: string;
  phone: string;
}

const TOTAL_STEPS = 9;

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone validation regex - allows international formats with extensions
const PHONE_REGEX = /^\+?[1-9]\d{0,2}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}(\s?(x|ext\.?|extension)\s?\d{1,5})?$/i;

interface GlobalQuizProps {
  isEmbedded?: boolean;
}

const GlobalQuiz = ({ isEmbedded = false }: GlobalQuizProps) => {
  const { isQuizOpen, prefillUsTax, closeQuiz } = useQuiz();
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isQualified, setIsQualified] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const { toast } = useToast();

  const [answers, setAnswers] = useState<QuizAnswers>({
    usTaxObligations: null,
    incomeSources: [],
    expatCountry: "",
    isExpat: true,
    nomadicLife: [],
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
      setEmailError("");
      setPhoneError("");

      if (prefillUsTax === "usTaxYes") {
        // User answered Yes to US Tax - start at step 1 (income sources)
        setAnswers({
          usTaxObligations: true,
          incomeSources: [],
          expatCountry: "",
          isExpat: true,
          nomadicLife: [],
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
          nomadicLife: [],
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
          nomadicLife: [],
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
    { id: "retirement", label: "Retirement/SS/Pension", icon: <Wallet className="w-5 h-5" /> },
    { id: "rental", label: "Rental Income", icon: <Building className="w-5 h-5" /> },
    { id: "investments", label: "Investments", icon: <DollarSign className="w-5 h-5" /> },
    { id: "other", label: "Other", icon: <MoreHorizontal className="w-5 h-5" /> },
  ];

  // NEW: Nomadic Life options (split from situations)
  const nomadicLifeOptions = [
    { id: "330days", label: "I spend over 330 days outside the USA in a year", icon: <Globe className="w-5 h-5" /> },
    { id: "visa-abroad", label: "I have a visa to live outside of the USA", icon: <Plane className="w-5 h-5" /> },
    { id: "multistate", label: "I've worked or earned income in multiple states", icon: <MapPin className="w-5 h-5" /> },
    { id: "planning", label: "Still planning my Nomadic life", icon: <Compass className="w-5 h-5" /> },
  ];

  // UPDATED: Situations options (now focused on pain points/attitudes)
  const situationOptions = [
    { id: "tax-averse", label: "I am highly averse to paying taxes", icon: <AlertTriangle className="w-5 h-5" /> },
    { id: "mixed-expenses", label: "I mix personal and business expenses sometimes", icon: <Shuffle className="w-5 h-5" /> },
    { id: "worried-mistakes", label: "I worry about doing something wrong", icon: <AlertCircle className="w-5 h-5" /> },
    { id: "bad-accountant", label: "My last accountant didn't provide the customer service I was hoping for", icon: <UserX className="w-5 h-5" /> },
    { id: "nomad-accountant", label: "Looking for an accountant that gets the digital nomad life", icon: <Heart className="w-5 h-5" /> },
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

  const validateEmail = (email: string): boolean => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      return false;
    }
    // Remove +1 prefix for validation if that's all there is
    const cleanedPhone = phone.replace(/^\+1\s*$/, "");
    if (!cleanedPhone || !PHONE_REGEX.test(phone)) {
      setPhoneError("Please enter a valid phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleSubmit = async () => {
    // Validate email and phone
    const isEmailValid = validateEmail(answers.email);
    const isPhoneValid = validatePhone(answers.phone);

    if (!isEmailValid || !isPhoneValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { qualified, reasons } = calculateQualification();

      // Submit to Formspree
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          // Contact info
          name: answers.name,
          email: answers.email,
          phone: answers.phone,
          
          // Qualification result
          qualified: qualified ? "Yes" : "No",
          qualification_reasons: reasons.join(", "),
          
          // Quiz answers (formatted for readability in email)
          us_tax_obligations: answers.usTaxObligations ? "Yes" : "No",
          income_sources: answers.incomeSources.join(", ") || "None selected",
          expat_country: answers.expatCountry || "Not an expat",
          is_expat: answers.isExpat ? "Yes" : "No",
          nomadic_life: answers.nomadicLife.join(", ") || "None selected",
          situations: answers.situations.join(", ") || "None selected",
          financial_tracking: answers.financialTracking || "Not specified",
          looking_for: answers.lookingFor.join(", ") || "None selected",
          urgency: urgencyLabels[answers.urgency],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
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

  // Check if submit button should be disabled
  const isSubmitDisabled = () => {
    if (!answers.name.trim()) return true;
    if (!answers.email.trim()) return true;
    if (!answers.phone.trim() || answers.phone.trim() === "+1") return true;
    if (isSubmitting) return true;
    return false;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <QuestionWrapper
            title="Do you have US Tax Obligations?"
            subtitle="US citizens, green card holders, and those with US income"
            backgroundImage={heatherHikingNature}
            placeholderImage={heatherHikingNaturePlaceholder}
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
            placeholderImage={vanSnowMountainsPlaceholder}
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
            placeholderImage={rvCoastalDrivePlaceholder}
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
        // NEW: Nomadic Life question
        return (
          <QuestionWrapper
            title="What does your Nomadic life look like?"
            subtitle="Select all that apply"
            backgroundImage={rvAutumnLeaves}
            placeholderImage={womanWorkingViewsPlaceholder}
          >
            <MultiSelectQuestion
              options={nomadicLifeOptions}
              selected={answers.nomadicLife}
              onChange={(val) => setAnswers({ ...answers, nomadicLife: val })}
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
        // UPDATED: Situations question (now focused on pain points)
        return (
          <QuestionWrapper
            title="Which of these apply to you?"
            subtitle="Select all that apply"
            backgroundImage={womanWorkingViews}
            placeholderImage={womanWorkingViewsPlaceholder}
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

      case 5:
        return (
          <QuestionWrapper
            title="How would you describe yourself when it comes to financial tracking and taxes?"
            backgroundImage={truckDesert}
            placeholderImage={truckDesertPlaceholder}
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

      case 6:
        return (
          <QuestionWrapper
            title="What are you looking for right now?"
            subtitle="Select all that apply"
            backgroundImage={workingAtBeach}
            placeholderImage={workingAtBeachPlaceholder}
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

      case 7:
        return (
          <QuestionWrapper
            title="How fast do you need help?"
            backgroundImage={campingByRiver}
            placeholderImage={campingByRiverPlaceholder}
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
            placeholderImage={sunsetRvReflectionPlaceholder}
          >
            <ContactForm
              name={answers.name}
              email={answers.email}
              phone={answers.phone}
              onNameChange={(val) => setAnswers({ ...answers, name: val })}
              onEmailChange={(val) => {
                setAnswers({ ...answers, email: val });
                if (emailError) validateEmail(val);
              }}
              onPhoneChange={(val) => {
                setAnswers({ ...answers, phone: val });
                if (phoneError) validatePhone(val);
              }}
              emailError={emailError}
              phoneError={phoneError}
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
                disabled={isSubmitDisabled()}
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

  // Preload all quiz background images in background (for smoother step transitions)
  // Quiz now opens instantly with blur-up placeholders - no blocking needed
  const shouldPreload = isEmbedded || isQuizOpen;
  useImagePreloader(shouldPreload ? QUIZ_BACKGROUND_IMAGES : []);

  // For embedded mode, always show and handle close differently
  const isOpen = isEmbedded || isQuizOpen;
  const handleClose = isEmbedded ? () => setShowResults(false) : closeQuiz;


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
