import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Globe,
  MapPin,
  Briefcase,
  DollarSign,
  ClipboardList,
  FolderOpen,
  Heart,
  Mail,
  Plane,
  Building,
  Laptop,
  Receipt,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import QuestionWrapper from "@/components/quiz/QuestionWrapper";
import QuizProgress from "@/components/quiz/QuizProgress";
import QuizModal from "@/components/quiz/QuizModal";
import QuizResults from "@/components/quiz/QuizResults";
import YesNoQuestion from "@/components/quiz/questions/YesNoQuestion";
import TextInputQuestion from "@/components/quiz/questions/TextInputQuestion";
import MultiSelectQuestion from "@/components/quiz/questions/MultiSelectQuestion";
import SingleSelectQuestion from "@/components/quiz/questions/SingleSelectQuestion";
import SliderQuestion from "@/components/quiz/questions/SliderQuestion";
import ContactForm from "@/components/quiz/questions/ContactForm";

// Import background images
import rvCoastalDrive from "@/assets/lifestyle/rv-coastal-drive.png";
import vanSnowMountains from "@/assets/lifestyle/van-snow-mountains.jpg";
import freedomNomad from "@/assets/lifestyle/freedom-nomad.jpg";
import rvMountainsBackground from "@/assets/lifestyle/rv-mountains-background.jpg";
import womanWorkingViews from "@/assets/lifestyle/woman-working-views.jpg";
import truckDesert from "@/assets/lifestyle/truck-desert.jpeg";
import workingAtBeach from "@/assets/lifestyle/working-at-beach.jpg";
import campingByRiver from "@/assets/lifestyle/camping-by-river.jpg";
import heatherHikingNature from "@/assets/lifestyle/heather-hiking-nature.jpg";
import sunsetRvReflection from "@/assets/lifestyle/sunset-rv-reflection.png";

// Quiz state interface
interface QuizAnswers {
  usTaxObligations: boolean | null;
  homeBase: string;
  livingTheLife: boolean | null;
  futureAdventures: boolean | null;
  incomeSources: string[];
  annualIncome: number;
  situations: string[];
  organizationStyle: string | null;
  lookingFor: string[];
  name: string;
  email: string;
  phone: string;
}

const TOTAL_STEPS = 9;

const QuizPreview = () => {
  // Complete modal quiz state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [isQualified, setIsQualified] = useState(false);

  const [answers, setAnswers] = useState<QuizAnswers>({
    usTaxObligations: null,
    homeBase: "",
    livingTheLife: null,
    futureAdventures: null,
    incomeSources: [],
    annualIncome: 2,
    situations: [],
    organizationStyle: null,
    lookingFor: [],
    name: "",
    email: "",
    phone: "",
  });

  // Options for questions
  const incomeOptions = [
    { id: "business", label: "Business Owner", icon: <Building className="w-5 h-5" /> },
    { id: "freelance", label: "Freelancer / Contractor", icon: <Laptop className="w-5 h-5" /> },
    { id: "1099", label: "1099 Income", icon: <Receipt className="w-5 h-5" /> },
    { id: "w2", label: "W-2 Employee", icon: <Briefcase className="w-5 h-5" /> },
    { id: "investments", label: "Investment Income", icon: <DollarSign className="w-5 h-5" /> },
  ];

  const situationOptions = [
    { id: "330days", label: "330+ days outside USA", icon: <Globe className="w-5 h-5" /> },
    { id: "multistate", label: "Worked in multiple states", icon: <MapPin className="w-5 h-5" /> },
    { id: "foreign", label: "Foreign bank accounts", icon: <DollarSign className="w-5 h-5" /> },
    { id: "badcpa", label: "Last CPA didn't get it", icon: <Heart className="w-5 h-5" /> },
    { id: "behindtaxes", label: "Behind on my taxes", icon: <Clock className="w-5 h-5" /> },
  ];

  const organizationOptions = [
    { id: "super", label: "Super Organized", description: "Everything tracked and filed" },
    { id: "pretty", label: "Pretty Organized", description: "Most things in order" },
    { id: "working", label: "Working on It", description: "Could use some improvement" },
    { id: "help", label: "I Need Help", description: "Paperwork everywhere!" },
  ];

  const lookingForOptions = [
    { id: "taxprep", label: "Annual Tax Preparation" },
    { id: "strategy", label: "Tax Strategy & Planning" },
    { id: "catchup", label: "Catching Up on Past Returns" },
    { id: "advice", label: "General Advice / Questions" },
  ];

  const incomeLabels = ["Under $40k", "$40k - $75k", "$75k - $150k", "$150k - $300k", "$300k+"];

  // Navigation handlers
  const goToNextStep = () => {
    // Handle conditional logic
    if (currentStep === 3 && answers.livingTheLife === true) {
      // Skip "Future Adventures" if already living the life
      setCurrentStep(5);
    } else if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep === 5 && answers.livingTheLife === true) {
      // Go back to step 3 if we skipped step 4
      setCurrentStep(3);
    } else if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate qualification - qualified if has US tax obligations and is/planning nomad life
    const qualified = 
      answers.usTaxObligations === true && 
      (answers.livingTheLife === true || answers.futureAdventures === true);
    
    setIsQualified(qualified);
    setShowResults(true);
  };

  const resetQuiz = () => {
    setCurrentStep(1);
    setShowResults(false);
    setIsQualified(false);
    setAnswers({
      usTaxObligations: null,
      homeBase: "",
      livingTheLife: null,
      futureAdventures: null,
      incomeSources: [],
      annualIncome: 2,
      situations: [],
      organizationStyle: null,
      lookingFor: [],
      name: "",
      email: "",
      phone: "",
    });
  };

  const openQuiz = () => {
    resetQuiz();
    setIsModalOpen(true);
  };

  // Auto-advance handler for Yes/No and Single-Select
  const handleAutoAdvance = () => {
    setTimeout(() => goToNextStep(), 400);
  };

  // Get effective step for progress (skip step 4 if living the life)
  const getEffectiveStep = () => {
    if (currentStep >= 5 && answers.livingTheLife === true) {
      return currentStep - 1;
    }
    return currentStep;
  };

  const getEffectiveTotal = () => {
    return answers.livingTheLife === true ? TOTAL_STEPS - 1 : TOTAL_STEPS;
  };

  // Render current question step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <QuestionWrapper
            title="US Tax Obligations?"
            subtitle="Are you a U.S. citizen, green card holder, or have U.S. tax filing requirements?"
            helpText="You have U.S. tax obligations if you're a citizen, permanent resident, or meet the substantial presence test."
            backgroundImage={rvCoastalDrive}
          >
            <YesNoQuestion
              value={answers.usTaxObligations}
              onChange={(val) => setAnswers({ ...answers, usTaxObligations: val })}
              onSelect={handleAutoAdvance}
            />
          </QuestionWrapper>
        );

      case 2:
        return (
          <QuestionWrapper
            title="Home Base?"
            subtitle="What's your domicile state? (Or where you're planning to be)"
            helpText="Your domicile is your permanent legal residence - where you're registered to vote, have your driver's license, or consider your 'home base'."
            backgroundImage={vanSnowMountains}
          >
            <TextInputQuestion
              value={answers.homeBase}
              onChange={(val) => setAnswers({ ...answers, homeBase: val })}
              placeholder="e.g., Texas, Florida, Nevada..."
              maxLength={50}
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
                disabled={!answers.homeBase.trim()}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </QuestionWrapper>
        );

      case 3:
        return (
          <QuestionWrapper
            title="Living the Life?"
            subtitle="Do you currently live outside the US as an expat, or travel & move around?"
            helpText="A digital nomad travels while working remotely. An expat lives abroad long-term. Both have unique tax considerations."
            backgroundImage={freedomNomad}
          >
            <YesNoQuestion
              value={answers.livingTheLife}
              onChange={(val) => setAnswers({ ...answers, livingTheLife: val })}
              onSelect={handleAutoAdvance}
              yesLabel="That's Me!"
              noLabel="Not Yet"
            />
            <div className="mt-5 flex justify-center">
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

      case 4:
        return (
          <QuestionWrapper
            title="Future Adventures?"
            subtitle="Are you planning to embrace the digital nomad lifestyle soon?"
            helpText="Planning ahead is smart! We can help you structure your taxes before you hit the road."
            backgroundImage={rvMountainsBackground}
          >
            <YesNoQuestion
              value={answers.futureAdventures}
              onChange={(val) => setAnswers({ ...answers, futureAdventures: val })}
              onSelect={handleAutoAdvance}
              yesLabel="Yes, planning!"
              noLabel="Just exploring"
            />
            <div className="mt-5 flex justify-center">
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

      case 6:
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

      case 7:
        return (
          <QuestionWrapper
            title="Your Situation?"
            subtitle="Which apply to you? (Select all)"
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

      case 8:
        return (
          <QuestionWrapper
            title="Organization Style?"
            subtitle="How would you describe your financial tracking?"
            helpText="Be honest! We work with all types."
            backgroundImage={campingByRiver}
          >
            <SingleSelectQuestion
              options={organizationOptions}
              selected={answers.organizationStyle}
              onChange={(val) => setAnswers({ ...answers, organizationStyle: val })}
              onSelect={handleAutoAdvance}
            />
            <div className="mt-5 flex justify-center">
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

      case 9:
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
                disabled={!answers.name.trim() || !answers.email.trim()}
              >
                See My Results
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </QuestionWrapper>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-3">
            Tax Queen Quiz Demo
          </h1>
          <p className="text-primary-foreground/80">
            Complete quiz experience with auto-advance, progress tracking, and results
          </p>
        </div>
      </div>

      {/* Launch Button */}
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
            onClick={openQuiz}
          >
            Start the Quiz
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Quiz Modal */}
      <QuizModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col h-full md:h-auto">
          {!showResults && (
            <QuizProgress currentStep={getEffectiveStep()} totalSteps={getEffectiveTotal()} />
          )}
          
          {showResults ? (
            <QuizResults
              isQualified={isQualified}
              userName={answers.name}
              onClose={() => setIsModalOpen(false)}
            />
          ) : (
            renderStep()
          )}
        </div>
      </QuizModal>
    </div>
  );
};

export default QuizPreview;
