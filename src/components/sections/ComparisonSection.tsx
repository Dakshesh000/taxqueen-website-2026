import { Check, X } from "lucide-react";
import { motion } from "motion/react";

const excellentFitItems = [
  "You worry you're leaving money on the table",
  "You're too overwhelmed to tackle taxes on the road",
  "Filing taxes fills you with anxiety",
  "You need help keeping your books going",
];

const notReadyYetItems = [
  "You're still in a traditional home working 9-to-5",
  "You'd rather do your own taxes",
  "Your business is still just an idea",
  "You're still in a traditional home and 9-to-5",
];

const ComparisonSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide text-foreground">
            What Makes You An Excellent Fit
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's how to know if we're ready to work together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Excellent Fit */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 md:p-8 rounded-xl border-2 border-primary"
          >
            <h3 className="text-xl md:text-2xl font-bold uppercase text-primary mb-6">
              You're an excellent fit for my tax services if:
            </h3>
            <ul className="space-y-4">
              {excellentFitItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not Ready Yet */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 md:p-8 rounded-xl border-2 border-muted-foreground/30 bg-muted/50"
          >
            <h3 className="text-xl md:text-2xl font-bold uppercase text-foreground mb-6">
              You're better off reading my free content if:
            </h3>
            <ul className="space-y-4">
              {notReadyYetItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
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
