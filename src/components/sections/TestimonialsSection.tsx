import { motion } from "motion/react";
import { TestimonialsColumn, ColumnItem } from "@/components/ui/testimonials-column";

// Import lifestyle images
import womenWorkingViews2 from "@/assets/lifestyle/women-working-views-2.jpg";
import rvAutumnLeaves2 from "@/assets/lifestyle/rv-autumn-leaves-2.jpg";
import droneRvsCamping from "@/assets/lifestyle/drone-rvs-camping.jpg";
import freedomNomad from "@/assets/lifestyle/freedom-nomad.jpg";
import sunsetRvReflection from "@/assets/lifestyle/sunset-rv-reflection.png";
import rvMountainsBackground from "@/assets/lifestyle/rv-mountains-background.jpg";

// Column 1 items
const column1Items: ColumnItem[] = [
  {
    type: "testimonial",
    text: "Owning and running a business was the easy part. When it came to taxes, I had no idea what to do or how to plan. Heather has been so helpful and breaks it all down in simple terms I can understand. She has helped me with the smartest moves for both me personally and in the business.",
    name: "Nikki",
    role: "Business Owner",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  },
  {
    type: "image",
    src: rvAutumnLeaves2,
    alt: "RV surrounded by beautiful autumn leaves",
  },
  {
    type: "testimonial",
    text: "Excellent service. Quick turnaround. Heather has surpassed any previous tax preparer with her customer service, and we will be back year after year for our tax preparation.",
    name: "Jon K.",
    role: "Personal Return",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    type: "testimonial",
    text: "Taxes have been an enormous stressor since I moved to Portugal and this could not have been a more straightforward process. If there is a review I can write advocating for your services let me know!",
    name: "Catherine",
    role: "Expat",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  },
  {
    type: "image",
    src: freedomNomad,
    alt: "Freedom of the nomad lifestyle",
  },
];

// Column 2 items
const column2Items: ColumnItem[] = [
  {
    type: "testimonial",
    text: "Heather has been our tax accountant for 11 years and has been consistently great to work with providing timely responses to all our questions and rapid processing of our tax returns.",
    name: "Mike M.",
    role: "11-Year Client",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    type: "testimonial",
    text: "I could have spent hours on Google searching for answers to the various topics in this course. Having them in one place and explained in a way that made sense was invaluable. It saved me so much stress and frustration.",
    name: "Marcia H.",
    role: "Course Student",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
  },
  {
    type: "image",
    src: droneRvsCamping,
    alt: "Aerial view of RVs camping",
  },
  {
    type: "testimonial",
    text: "I trust you and you know my taxes intimately. You have been the best thing to happen to me and my taxes and I wish I had worked with you from the beginning!",
    name: "Bina J.",
    role: "Personal & S-Corp",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=face",
  },
  {
    type: "image",
    src: sunsetRvReflection,
    alt: "Beautiful sunset reflection in RV",
  },
];

// Column 3 items
const column3Items: ColumnItem[] = [
  {
    type: "image",
    src: womenWorkingViews2,
    alt: "Woman working remotely with beautiful views",
  },
  {
    type: "testimonial",
    text: "I have been working with Heather for over 4 years now and she is as sharp as they come. The perfect fit for our needs. She helps us keep our books clean for tax time while helping me make critical business decisions.",
    name: "James W.",
    role: "Weatherproof Roofing",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    type: "testimonial",
    text: "Heather has been our accountant for over 8 years, and in that time has completely changed how I feel about accountants. She is easily accessible via email or phone and has helped us turn our business tax situation around.",
    name: "Alowetta T.",
    role: "Thin Air Web",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
  },
  {
    type: "image",
    src: rvMountainsBackground,
    alt: "RV parked with mountains in background",
  },
  {
    type: "testimonial",
    text: "You're the BEST! You are so prompt and super helpful (and patient!). Thank you!",
    name: "Sevilla",
    role: "Personal",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-primary overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-sm font-medium text-primary-foreground/80 uppercase tracking-wider mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground tracking-tight text-center uppercase">
            What Our Clients Say
          </h2>
          <p className="text-center mt-4 text-primary-foreground/80">
            Real stories from digital nomads and business owners who trust Tax Queen with their taxes.
          </p>
        </motion.div>

        {/* Scrolling Columns */}
        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[700px] overflow-hidden">
          <TestimonialsColumn items={column1Items} duration={25} />
          <TestimonialsColumn 
            items={column2Items} 
            className="hidden md:block" 
            duration={30} 
          />
          <TestimonialsColumn 
            items={column3Items} 
            className="hidden lg:block" 
            duration={22} 
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
