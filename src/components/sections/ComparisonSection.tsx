import { Check, X } from "lucide-react";
import { motion } from "motion/react";

const withoutItems = [
  "Overpaying taxes without knowing deductions",
  "Confusion about multi-state tax obligations",
  "Missing nomad-specific tax strategies",
  "Stress during tax season",
  "Risk of IRS audits from errors",
];

const withItems = [
  "Maximize deductions tailored for nomads",
  "Clear guidance on state tax residency",
  "Strategic planning to minimize tax burden",
  "Year-round support and peace of mind",
  "Accurate, audit-proof tax filings",
];

const ComparisonSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-foreground">
            The Tax Queen Difference
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See how working with a nomad tax specialist transforms your tax experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Without Tax Queen */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 md:p-8 rounded-xl border-2 border-muted-foreground/30 bg-muted/50"
          >
            <h3 className="text-xl md:text-2xl font-bold uppercase text-foreground mb-6">
              Without Tax Queen
            </h3>
            <ul className="space-y-4">
              {withoutItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* With Tax Queen */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 md:p-8 rounded-xl border-2 border-primary bg-primary/5"
          >
            <h3 className="text-xl md:text-2xl font-bold uppercase text-primary mb-6">
              With Tax Queen
            </h3>
            <ul className="space-y-4">
              {withItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
