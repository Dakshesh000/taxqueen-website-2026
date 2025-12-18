import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { FileText, Sparkles, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

import womanWorkingViews from "@/assets/lifestyle/woman-working-views.jpg";
import rvCoastalDrive from "@/assets/lifestyle/rv-coastal-drive.png";
import heatherHikingNature from "@/assets/lifestyle/heather-hiking-nature.jpg";
import campingByRiver from "@/assets/lifestyle/camping-by-river.jpg";
import workingAtBeach from "@/assets/lifestyle/working-at-beach.jpg";
import vanSnowMountains from "@/assets/lifestyle/van-snow-mountains.jpg";

const ServicesTimeline = () => {
  const data = [
    {
      title: "Tax Preparation",
      content: (
        <div>
          <p className="text-foreground text-sm md:text-base font-medium mb-4">
            <span className="text-primary font-semibold">For:</span> US taxpayers who want filing done correctly and stress-free.
          </p>

          <p className="text-muted-foreground text-sm md:text-base mb-4">
            <span className="font-medium text-foreground">Covers:</span> Federal + state filing, self-employment/business income, nomad-specific considerations.
          </p>

          <p className="text-muted-foreground text-sm md:text-base mb-4">
            <span className="font-medium text-foreground">Not for:</span> aggressive loopholes or risky deductions.
          </p>

          <div className="flex items-center gap-2 text-primary mb-8">
            <FileText className="h-5 w-5" />
            <span className="font-medium">Secure portal + guided process</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <img
              src={womanWorkingViews}
              alt="Woman working with scenic views"
              className="rounded-lg object-cover h-32 md:h-48 w-full shadow-md"
            />
            <img
              src={rvCoastalDrive}
              alt="RV on coastal drive"
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
      title: "Tax Strategy & Planning",
      content: (
        <div>
          <p className="text-foreground text-sm md:text-base font-medium mb-4">
            <span className="text-primary font-semibold">For:</span> business owners + freelancers who want a plan (not surprises).
          </p>

          <p className="text-muted-foreground text-sm md:text-base mb-4">
            <span className="font-medium text-foreground">Covers:</span> quarterly tax planning, deductions/credits guidance, LLC vs S-Corp clarity.
          </p>

          <p className="text-muted-foreground text-sm md:text-base mb-4">
            <span className="font-medium text-foreground">Not for:</span> "one-size-fits-all" advice.
          </p>

          <div className="flex items-center gap-2 text-primary mb-8">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">Clear action steps you can follow</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <img
              src={heatherHikingNature}
              alt="Heather hiking in nature"
              className="rounded-lg object-cover h-32 md:h-48 w-full shadow-md"
            />
            <img
              src={campingByRiver}
              alt="Camping by river"
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
      title: "Mini Tax Planning Session",
      content: (
        <div>
          <p className="text-foreground text-sm md:text-base font-medium mb-4">
            <span className="text-primary font-semibold">For:</span> people who need clarity before choosing a service.
          </p>

          <p className="text-muted-foreground text-sm md:text-base mb-4">
            <span className="font-medium text-foreground">Covers:</span> domicile questions, deductions reality-check, next steps based on your situation.
          </p>

          <p className="text-muted-foreground text-sm md:text-base mb-4">
            <span className="font-medium text-foreground">Not for:</span> full tax filing or long-term support.
          </p>

          <div className="flex items-center gap-2 text-primary mb-8">
            <Compass className="h-5 w-5" />
            <span className="font-medium">Quick clarity + direction</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <img
              src={workingAtBeach}
              alt="Working at beach"
              className="rounded-lg object-cover h-32 md:h-48 w-full shadow-md"
            />
            <img
              src={vanSnowMountains}
              alt="Van in snowy mountains"
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
    <section className="w-full">
      <Timeline data={data} />
    </section>
  );
};

export default ServicesTimeline;
