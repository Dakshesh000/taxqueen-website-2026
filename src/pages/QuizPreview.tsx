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

const QuizPreview = () => {
  // State for all demo values
  const [yesNoValue, setYesNoValue] = useState<boolean | null>(null);
  const [textValue, setTextValue] = useState("");
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [singleSelectValue, setSingleSelectValue] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState(2);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [modalYesNo, setModalYesNo] = useState<boolean | null>(null);
  const [modalSingleSelect, setModalSingleSelect] = useState<string | null>(null);

  // Sample options for multi-select
  const incomeOptions = [
    { id: "business", label: "Business Owner", icon: <Building className="w-5 h-5" /> },
    { id: "freelance", label: "Freelancer / Contractor", icon: <Laptop className="w-5 h-5" /> },
    { id: "1099", label: "1099 Income", icon: <Receipt className="w-5 h-5" /> },
    { id: "w2", label: "W-2 Employee", icon: <Briefcase className="w-5 h-5" /> },
    { id: "investments", label: "Investment Income", icon: <DollarSign className="w-5 h-5" /> },
  ];

  // Sample options for single-select
  const organizationOptions = [
    { id: "super", label: "Super Organized", description: "Everything tracked and filed" },
    { id: "pretty", label: "Pretty Organized", description: "Most things in order" },
    { id: "working", label: "Working on It", description: "Could use some improvement" },
    { id: "help", label: "I Need Help", description: "Paperwork everywhere!" },
  ];

  // Income labels for slider
  const incomeLabels = [
    "Under $40k",
    "$40k - $75k",
    "$75k - $150k",
    "$150k - $300k",
    "$300k+",
  ];

  // Auto-advance handler for modal demo
  const handleModalAutoAdvance = () => {
    setModalStep((s) => Math.min(8, s + 1));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-3">
            Quiz Component Preview
          </h1>
          <p className="text-primary-foreground/80">
            Review each question type before we assemble the full quiz experience
          </p>
        </div>
      </div>

      {/* Progress Bar Demo */}
      <div className="max-w-2xl mx-auto py-8 px-6">
        <h2 className="text-xl font-bold text-foreground mb-4 text-center">
          Journey Progress Indicator
        </h2>
        <div className="bg-card rounded-2xl shadow-md p-6">
          <QuizProgress currentStep={modalStep} totalSteps={8} />
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setModalStep((s) => Math.max(1, s - 1))}
            >
              Prev Stop
            </Button>
            <Button
              size="sm"
              onClick={() => setModalStep((s) => Math.min(8, s + 1))}
            >
              Next Stop
            </Button>
          </div>
        </div>
      </div>

      {/* Question Previews */}
      <div className="max-w-4xl mx-auto px-6 pb-16 space-y-12">
        
        {/* 1. Yes/No Question */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            1. Yes/No Question
          </h2>
          <QuestionWrapper
            title="US Tax Obligations?"
            subtitle="Are you a U.S. citizen, green card holder, or have U.S. tax filing requirements?"
            helpText="You have U.S. tax obligations if you're a citizen, permanent resident, or spent more than 183 days in the U.S. over a 3-year period using a weighted formula."
            backgroundImage={rvCoastalDrive}
          >
            <YesNoQuestion value={yesNoValue} onChange={setYesNoValue} />
          </QuestionWrapper>
        </section>

        {/* 2. Text Input Question */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            2. Text Input Question
          </h2>
          <QuestionWrapper
            title="Home Base?"
            subtitle="What's your domicile state? (Or where you're planning to be)"
            helpText="Your domicile is your permanent legal residence - where you're registered to vote, have your driver's license, or consider your 'home base' even when traveling."
            backgroundImage={vanSnowMountains}
          >
            <TextInputQuestion
              value={textValue}
              onChange={setTextValue}
              placeholder="e.g., Texas, Florida, Nevada..."
              maxLength={50}
            />
          </QuestionWrapper>
        </section>

        {/* 3. Yes/No Question (Travel Style) */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            3. Yes/No Question (Lifestyle)
          </h2>
          <QuestionWrapper
            title="Living the Life?"
            subtitle="Do you live outside the US as an expat, or travel & move around?"
            helpText="A digital nomad travels while working remotely. An expat lives abroad long-term. Both have unique tax considerations we specialize in."
            backgroundImage={freedomNomad}
          >
            <YesNoQuestion
              value={yesNoValue}
              onChange={setYesNoValue}
              yesLabel="That's Me!"
              noLabel="Not Yet"
            />
          </QuestionWrapper>
        </section>

        {/* 4. Yes/No Question (Future Plans) */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            4. Yes/No Question (Future Plans)
          </h2>
          <QuestionWrapper
            title="Future Adventures?"
            subtitle="Are you planning to embrace the digital nomad lifestyle soon?"
            helpText="Planning ahead is smart! We can help you structure your taxes before you hit the road to maximize savings."
            backgroundImage={rvMountainsBackground}
          >
            <YesNoQuestion
              value={yesNoValue}
              onChange={setYesNoValue}
              yesLabel="Yes, planning!"
              noLabel="Just exploring"
            />
          </QuestionWrapper>
        </section>

        {/* 5. Multi-Select Question */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            5. Multi-Select Question
          </h2>
          <QuestionWrapper
            title="Income Sources?"
            subtitle="How do you make money right now? (Select all that apply)"
            helpText="Different income types have different tax treatments. Understanding your mix helps us optimize your strategy."
            backgroundImage={womanWorkingViews}
          >
            <MultiSelectQuestion
              options={incomeOptions}
              selected={multiSelectValue}
              onChange={setMultiSelectValue}
            />
          </QuestionWrapper>
        </section>

        {/* 6. Slider Question */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            6. Slider Question
          </h2>
          <QuestionWrapper
            title="Annual Income?"
            subtitle="What's your approximate annual income?"
            helpText="This helps us understand which tax strategies and deductions will benefit you most. Don't worry - this is just an estimate!"
            backgroundImage={truckDesert}
          >
            <SliderQuestion
              value={sliderValue}
              onChange={setSliderValue}
              labels={incomeLabels}
            />
          </QuestionWrapper>
        </section>

        {/* 7. Multi-Select Question (Situations) */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            7. Multi-Select Question (Checkboxes)
          </h2>
          <QuestionWrapper
            title="Your Situation?"
            subtitle="Which of these apply to you? (Select all that apply)"
            helpText="Check all that apply. Each of these situations has specific tax implications we're experts at handling."
            backgroundImage={workingAtBeach}
          >
            <MultiSelectQuestion
              options={[
                { id: "330days", label: "330+ days outside USA this year", icon: <Globe className="w-5 h-5" /> },
                { id: "multistate", label: "Worked in multiple states", icon: <MapPin className="w-5 h-5" /> },
                { id: "foreign", label: "Foreign bank accounts or income", icon: <DollarSign className="w-5 h-5" /> },
                { id: "badcpa", label: "Last accountant didn't get it", icon: <Heart className="w-5 h-5" /> },
                { id: "behindtaxes", label: "Behind on my taxes", icon: <Clock className="w-5 h-5" /> },
              ]}
              selected={multiSelectValue}
              onChange={setMultiSelectValue}
            />
          </QuestionWrapper>
        </section>

        {/* 8. Single-Select Question */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            8. Single-Select Question
          </h2>
          <QuestionWrapper
            title="Organization Style?"
            subtitle="How would you describe yourself with financial tracking?"
            helpText="Be honest! We work with all types. This helps us understand what level of support you'll need."
            backgroundImage={campingByRiver}
          >
            <SingleSelectQuestion
              options={organizationOptions}
              selected={singleSelectValue}
              onChange={setSingleSelectValue}
            />
          </QuestionWrapper>
        </section>

        {/* 9. Optional Multi-Select */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            9. Optional Multi-Select
          </h2>
          <QuestionWrapper
            title="Looking For?"
            subtitle="What brings you here today? (Optional)"
            helpText="This helps us prepare for your discovery call. Skip if you're not sure yet!"
            backgroundImage={heatherHikingNature}
          >
            <MultiSelectQuestion
              options={[
                { id: "taxprep", label: "Annual Tax Preparation" },
                { id: "strategy", label: "Tax Strategy & Planning" },
                { id: "catchup", label: "Catching Up on Past Returns" },
                { id: "advice", label: "General Advice / Questions" },
              ]}
              selected={multiSelectValue}
              onChange={setMultiSelectValue}
            />
          </QuestionWrapper>
        </section>

        {/* 10. Contact Form */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            10. Contact Collection
          </h2>
          <QuestionWrapper
            title="Almost There!"
            subtitle="Where should we send your personalized results?"
            backgroundImage={sunsetRvReflection}
          >
            <ContactForm
              name={contactName}
              email={contactEmail}
              onNameChange={setContactName}
              onEmailChange={setContactEmail}
            />
          </QuestionWrapper>
        </section>

        {/* Modal Demo */}
        <section className="bg-card rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Modal Experience Demo
          </h2>
          <p className="text-muted-foreground mb-6">
            Click below to see auto-advance behavior in action
          </p>
          <Button
            size="lg"
            className="rounded-full px-8"
            onClick={() => {
              setIsModalOpen(true);
              setModalStep(1);
              setModalYesNo(null);
              setModalSingleSelect(null);
            }}
          >
            Open Quiz Modal
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </section>

        {/* Approval Section */}
        <section className="bg-primary/10 rounded-2xl p-8 text-center border-2 border-primary/30">
          <h2 className="text-2xl font-bold text-foreground mb-4 uppercase">
            Ready to Approve?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Once you approve these question styles, we'll stitch them together
            into the complete quiz flow with scoring logic.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="rounded-full px-6">
              Request Changes
            </Button>
            <Button className="rounded-full px-6">
              Approve & Build Quiz
            </Button>
          </div>
        </section>
      </div>

      {/* Modal Demo with Auto-Advance */}
      <QuizModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <QuizProgress currentStep={modalStep} totalSteps={8} />
        
        {modalStep === 1 && (
          <QuestionWrapper
            title="Living the Life?"
            subtitle="Do you live outside the US as an expat, or travel & move around?"
            helpText="A digital nomad travels while working remotely. An expat lives abroad long-term."
            backgroundImage={freedomNomad}
          >
            <YesNoQuestion
              value={modalYesNo}
              onChange={setModalYesNo}
              onSelect={handleModalAutoAdvance}
              yesLabel="That's Me!"
              noLabel="Not Yet"
            />
          </QuestionWrapper>
        )}
        
        {modalStep === 2 && (
          <QuestionWrapper
            title="Organization Style?"
            subtitle="How would you describe yourself with financial tracking?"
            helpText="Be honest! We work with all types."
            backgroundImage={campingByRiver}
          >
            <SingleSelectQuestion
              options={organizationOptions}
              selected={modalSingleSelect}
              onChange={setModalSingleSelect}
              onSelect={handleModalAutoAdvance}
            />
            <div className="mt-8 flex justify-center">
              <Button
                variant="outline"
                className="rounded-full text-foreground border-muted-foreground/30 hover:bg-muted"
                onClick={() => setModalStep(1)}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </QuestionWrapper>
        )}
        
        {modalStep >= 3 && (
          <QuestionWrapper
            title="Demo Complete!"
            subtitle="Auto-advance works! Selection automatically moves to next question."
            backgroundImage={sunsetRvReflection}
          >
            <div className="text-center text-primary-foreground">
              <p className="mb-6">You've experienced the auto-advance feature.</p>
              <Button
                variant="outline"
                className="rounded-full text-foreground border-muted-foreground/30 hover:bg-muted"
                onClick={() => setIsModalOpen(false)}
              >
                Close Demo
              </Button>
            </div>
          </QuestionWrapper>
        )}
      </QuizModal>
    </div>
  );
};

export default QuizPreview;
