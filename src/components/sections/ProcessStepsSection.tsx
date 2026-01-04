import { motion } from "motion/react";

const steps = [
  {
    number: 1,
    title: "Get In Touch",
    description: "Get in touch to see if we're a good fit. If we mesh, I'll recommend a service package that meets your needs."
  },
  {
    number: 2,
    title: "Secure Document Sharing",
    description: "No printer? No problem! I'll add you to my client portal, where we can share electronic documents securely and seamlessly. You can even upload images from your phone using a mobile app."
  },
  {
    number: 3,
    title: "Sit Back & Relax",
    description: "Once I've got all the information I need, just sit back and relax! I'm known for my speed and responsiveness."
  }
];

const ProcessStepsSection = () => {
  return (
    <section className="bg-primary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center text-primary-foreground uppercase tracking-wide mb-12 md:mb-16"
        >
          Your Journey Starts Here
        </motion.h2>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Connector lines - desktop only */}
          <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-0.5 bg-white/30" style={{ left: '16.67%', right: '16.67%' }} />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Step number circle */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-white text-primary font-bold text-xl flex items-center justify-center mb-4 shadow-lg">
                {step.number}
              </div>

              {/* Step title */}
              <h3 className="text-lg font-semibold text-primary-foreground uppercase tracking-wide mb-3">
                {step.title}
              </h3>

              {/* Step description */}
              <p className="text-primary-foreground/90 text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessStepsSection;
