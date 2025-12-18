import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { FileText, Sparkles, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

// Tax Preparation images
import taxPrep1 from "@/assets/services/tax-preparation-1.jpg";
import taxPrep2 from "@/assets/services/tax-preparation-2.jpg";
// Tax Strategy images
import taxStrategy1 from "@/assets/services/tax-strategy-1.jpg";
import taxStrategy2 from "@/assets/services/tax-strategy-2.jpg";
// Mini Session images
import miniSession1 from "@/assets/services/mini-session-1.jpg";
import miniSession2 from "@/assets/services/mini-session-2.jpg";

const BulletItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2 text-foreground text-base md:text-lg">
    <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
    <span>{children}</span>
  </li>
);

const ServicesTimeline = () => {
  const data = [
    {
      title: "1. Tax Preparation",
      content: (
        <div>
          <p className="text-foreground text-base md:text-lg font-medium mb-4">
            <span className="font-semibold">For:</span> US taxpayers who want filing done correctly and stress-free.
          </p>

          <div className="mb-4">
            <p className="font-medium text-foreground text-base md:text-lg mb-2">Covers:</p>
            <ul className="space-y-1.5 pl-4">
              <BulletItem>Federal + state filing</BulletItem>
              <BulletItem>Self-employment & business income</BulletItem>
              <BulletItem>Foreign Tax Credits (Form 1116)</BulletItem>
              <BulletItem>FBAR & FATCA reporting</BulletItem>
              <BulletItem>Quarterly estimates</BulletItem>
            </ul>
          </div>

          <p className="text-muted-foreground text-base md:text-lg mb-4">
            <span className="font-medium text-foreground">Not for:</span> aggressive loopholes or risky deductions.
          </p>

          <div className="flex items-center gap-2 text-foreground mb-8">
            <FileText className="h-5 w-5" />
            <span className="font-medium text-base md:text-lg">Secure portal + guided process</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <img
              src={taxPrep1}
              alt="Tax preparation documents and calculator"
              className="rounded-lg object-cover h-32 md:h-48 w-full shadow-md"
            />
            <img
              src={taxPrep2}
              alt="Organized tax paperwork"
              className="rounded-lg object-cover h-32 md:h-48 w-full shadow-md"
            />
          </div>

          <Button variant="cta" className="mt-4">
            Get Started
          </Button>
        </div>
      ),
    },
    {
      title: "2. Tax Strategy & Planning",
      content: (
        <div>
          <p className="text-foreground text-base md:text-lg font-medium mb-4">
            <span className="font-semibold">For:</span> business owners + freelancers who want a plan (not surprises).
          </p>

          <div className="mb-4">
            <p className="font-medium text-foreground text-base md:text-lg mb-2">Covers:</p>
            <ul className="space-y-1.5 pl-4">
              <BulletItem>Quarterly tax planning</BulletItem>
              <BulletItem>Deduction & credits optimization</BulletItem>
              <BulletItem>LLC vs S-Corp clarity</BulletItem>
              <BulletItem>Business structure advice</BulletItem>
              <BulletItem>Year-round support</BulletItem>
            </ul>
          </div>

          <div className="flex items-center gap-2 text-foreground mb-8">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium text-base md:text-lg">Clear action steps you can follow</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <img
              src={taxStrategy1}
              alt="Financial charts and planning"
              className="rounded-lg object-cover h-32 md:h-48 w-full shadow-md"
            />
            <img
              src={taxStrategy2}
              alt="Calendar and planning documents"
              className="rounded-lg object-cover h-32 md:h-48 w-full shadow-md"
            />
          </div>

          <Button variant="cta" className="mt-4">
            Get Started
          </Button>
        </div>
      ),
    },
    {
      title: "3. Mini Tax Planning Session",
      content: (
        <div>
          <p className="text-foreground text-base md:text-lg font-medium mb-4">
            <span className="font-semibold">For:</span> people who need clarity before choosing a service.
          </p>

          <div className="mb-4">
            <p className="font-medium text-foreground text-base md:text-lg mb-2">Covers:</p>
            <ul className="space-y-1.5 pl-4">
              <BulletItem>Domicile & residency questions</BulletItem>
              <BulletItem>Deductions reality-check</BulletItem>
              <BulletItem>Next steps based on your situation</BulletItem>
              <BulletItem>Custom action plan</BulletItem>
            </ul>
          </div>

          <p className="text-muted-foreground text-base md:text-lg mb-4">
            <span className="font-medium text-foreground">Not for:</span> full tax filing or long-term support.
          </p>

          <div className="flex items-center gap-2 text-foreground mb-8">
            <Compass className="h-5 w-5" />
            <span className="font-medium text-base md:text-lg">Quick clarity + direction</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <img
              src={miniSession1}
              alt="Quick consultation checklist"
              className="rounded-lg object-cover h-32 md:h-48 w-full shadow-md"
            />
            <img
              src={miniSession2}
              alt="Virtual meeting setup"
              className="rounded-lg object-cover h-32 md:h-48 w-full shadow-md"
            />
          </div>

          <Button variant="cta" className="mt-4">
            Get Started
          </Button>
        </div>
      ),
    },
  ];

  return (
    <section id="services" className="w-full">
      <Timeline data={data} />
    </section>
  );
};

export default ServicesTimeline;
