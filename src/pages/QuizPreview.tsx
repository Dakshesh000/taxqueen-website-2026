import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Globe,
  MapPin,
  Compass,
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
          <QuizProgress currentStep={modalStep} totalSteps={10} />
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
              onClick={() => setModalStep((s) => Math.min(10, s + 1))}
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
            title="Do You Have U.S. Tax Obligations?"
            subtitle="This includes being a U.S. citizen, green card holder, or meeting substantial presence"
            helpText="You have U.S. tax obligations if you're a citizen, permanent resident, or spent more than 183 days in the U.S. over a 3-year period using a weighted formula."
            backgroundImage={rvCoastalDrive}
            icon={<Globe className="w-8 h-8 text-primary-foreground" />}
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
            title="Where's Home Base?"
            subtitle="What state is your legal domicile?"
            helpText="Your domicile is your permanent legal residence - where you're registered to vote, have your driver's license, or consider your 'home base' even when traveling."
            backgroundImage={vanSnowMountains}
            icon={<MapPin className="w-8 h-8 text-primary-foreground" />}
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
            title="Your Travel Style"
            subtitle="Are you currently living as a digital nomad or expat?"
            helpText="A digital nomad travels while working remotely. An expat lives abroad long-term. Both have unique tax considerations we specialize in."
            backgroundImage={freedomNomad}
            icon={<Compass className="w-8 h-8 text-primary-foreground" />}
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
            subtitle="Are you planning to embrace the nomad life soon?"
            helpText="Planning ahead is smart! We can help you structure your taxes before you hit the road to maximize savings."
            backgroundImage={rvMountainsBackground}
            icon={<Plane className="w-8 h-8 text-primary-foreground" />}
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
            title="How Do You Fuel Your Adventures?"
            subtitle="Select all your income sources"
            helpText="Different income types have different tax treatments. Understanding your mix helps us optimize your strategy."
            backgroundImage={womanWorkingViews}
            icon={<Briefcase className="w-8 h-8 text-primary-foreground" />}
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
            title="Your Financial Horizon"
            subtitle="What's your approximate annual income?"
            helpText="This helps us understand which tax strategies and deductions will benefit you most. Don't worry - this is just an estimate!"
            backgroundImage={truckDesert}
            icon={<DollarSign className="w-8 h-8 text-primary-foreground" />}
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
            title="Your Situation"
            subtitle="Which of these apply to you?"
            helpText="Check all that apply. Each of these situations has specific tax implications we're experts at handling."
            backgroundImage={workingAtBeach}
            icon={<ClipboardList className="w-8 h-8 text-primary-foreground" />}
          >
            <MultiSelectQuestion
              options={[
                { id: "330days", label: "I've spent 330+ days outside the USA this year", icon: <Globe className="w-5 h-5" /> },
                { id: "multistate", label: "I've worked in multiple states", icon: <MapPin className="w-5 h-5" /> },
                { id: "foreign", label: "I have foreign bank accounts or income", icon: <DollarSign className="w-5 h-5" /> },
                { id: "badcpa", label: "My last accountant didn't get my lifestyle", icon: <Heart className="w-5 h-5" /> },
                { id: "behindtaxes", label: "I'm behind on my taxes", icon: <Clock className="w-5 h-5" /> },
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
            title="Your Organization Style"
            subtitle="How well do you track your finances?"
            helpText="Be honest! We work with all types. This helps us understand what level of support you'll need."
            backgroundImage={campingByRiver}
            icon={<FolderOpen className="w-8 h-8 text-primary-foreground" />}
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
            title="What Brings You Here?"
            subtitle="What are you looking for? (optional)"
            helpText="This helps us prepare for your discovery call. Skip if you're not sure yet!"
            backgroundImage={heatherHikingNature}
            icon={<Sparkles className="w-8 h-8 text-primary-foreground" />}
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
            subtitle="Where should we send your results?"
            backgroundImage={sunsetRvReflection}
            icon={<Mail className="w-8 h-8 text-primary-foreground" />}
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
            Click below to see how the quiz will appear as a modal overlay
          </p>
          <Button
            size="lg"
            className="rounded-full px-8"
            onClick={() => setIsModalOpen(true)}
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

      {/* Modal Demo */}
      <QuizModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <QuizProgress currentStep={3} totalSteps={10} />
        <QuestionWrapper
          title="Your Travel Style"
          subtitle="Are you currently living as a digital nomad or expat?"
          helpText="A digital nomad travels while working remotely. An expat lives abroad long-term."
          backgroundImage={freedomNomad}
          icon={<Compass className="w-8 h-8 text-primary-foreground" />}
        >
          <YesNoQuestion
            value={yesNoValue}
            onChange={setYesNoValue}
            yesLabel="That's Me!"
            noLabel="Not Yet"
          />
          <div className="mt-8 flex justify-center gap-4">
            <Button
              variant="outline"
              className="rounded-full text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/20"
            >
              Back
            </Button>
            <Button className="rounded-full px-8">
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </QuestionWrapper>
      </QuizModal>
    </div>
  );
};

export default QuizPreview;
