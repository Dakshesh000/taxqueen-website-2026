import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Placeholder Q&A - to be replaced with actual content
const questions = [
  {
    question: "Who do you help with taxes?",
    answer: "We specialize in helping US citizens and residents who live abroad, digital nomads, remote workers, and expats navigate their US tax obligations. Whether you're working from Bali or traveling through Europe, we understand the unique challenges of your lifestyle.",
  },
  {
    question: "How does your process work?",
    answer: "Our process is simple: First, we have a discovery call to understand your situation. Then, we gather your documents securely online. Next, we prepare and review your returns with you. Finally, we file and provide year-round support for any questions.",
  },
  {
    question: "What if I haven't filed in years?",
    answer: "Don't worry – you're not alone, and we can help. We specialize in helping nomads get caught up with back taxes through streamlined filing procedures. We'll assess your situation and create a plan to get you compliant without unnecessary stress.",
  },
  {
    question: "Do I really need to file US taxes abroad?",
    answer: "Yes, US citizens and green card holders are required to file US taxes regardless of where they live or earn income. However, there are exclusions and credits available that can significantly reduce or eliminate your US tax liability.",
  },
  {
    question: "How much do your services cost?",
    answer: "Our pricing depends on the complexity of your tax situation. We offer transparent, flat-fee pricing so you know exactly what to expect. Book a free consultation and we'll provide a custom quote based on your specific needs.",
  },
];

const FAQSection = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <section id="faq" className="py-20">
      {/* Desktop: Split Screen Layout */}
      <div className="hidden md:grid md:grid-cols-2 min-h-[500px]">
        {/* Left Side - Questions (White) */}
        <div className="bg-background p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8 text-right">
            You've got questions.
          </h2>
          
          <div className="space-y-3">
            {questions.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "w-full text-right p-4 rounded-lg transition-all duration-300",
                  selectedIndex === index
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/50 text-foreground hover:bg-muted"
                )}
              >
                <span className="font-medium">{item.question}</span>
              </button>
            ))}
          </div>

          <a
            href="#full-faq"
            className="inline-block mt-8 text-sm text-muted-foreground hover:text-primary transition-colors text-right"
          >
            Didn't find what you're looking for? Click here →
          </a>
        </div>

        {/* Right Side - Answer (Primary Blue) */}
        <div className="bg-primary p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-8">
            I have the answers.
          </h2>
          
          <div
            key={selectedIndex}
            className="animate-fade-in"
          >
            <h3 className="text-xl font-semibold text-primary-foreground mb-4">
              {questions[selectedIndex].question}
            </h3>
            <p className="text-primary-foreground/90 leading-relaxed text-lg">
              {questions[selectedIndex].answer}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile: Accordion Layout */}
      <div className="md:hidden container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8">
          You've got questions.<br />
          <span className="text-primary">I have the answers.</span>
        </h2>

        <Accordion type="single" defaultValue="item-0" collapsible className="space-y-3">
          {questions.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-muted/50 rounded-lg px-4 border-none"
            >
              <AccordionTrigger className="text-left hover:no-underline py-4">
                <span className="font-medium">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <a
          href="#full-faq"
          className="inline-block mt-8 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Didn't find what you're looking for? Click here →
        </a>
      </div>
    </section>
  );
};

export default FAQSection;
