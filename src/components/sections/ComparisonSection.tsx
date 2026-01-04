import { Check, X } from "lucide-react";
import { motion } from "motion/react";

const notReadyYetItems = [
  "You've got tons of questions, but aren't ready to hire a tax pro just yet",
  "You need quick answers to some burning questions, but you'd rather do your own taxes",
  "Your business is still just a twinkle in your eye, and you're looking to build some knowledge for the future",
  "You're still in a sticks-and-bricks home and working your corporate 9-to-5",
];

const excellentFitItems = [
  "You worry that you're leaving money on the table and need professional help optimizing your annual return",
  "You're too overwhelmed and overworked to dive into your taxes—especially now that you're on the road",
  "You're earning a decent income, but just thinking about filing your taxes fills you with anxiety",
  "You understand your books, but you need help keeping them going (because you can't be everywhere at once, and why not outsource the stuff you hate?)",
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
            Am I A Good Fit?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Here's how to know if we're ready to work together
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Not Ready Yet */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
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

          {/* Excellent Fit */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 md:p-8 rounded-xl border-2 border-primary bg-primary/5"
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
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10 text-muted-foreground max-w-3xl mx-auto"
        >
          If we aren't a good fit yet, check out my online courses via the{" "}
          <a 
            href="https://nomadbusinessacademy.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            Nomad Business Academy
          </a>
          . You'll find everything you need to finally take control of your business finances.
        </motion.p>
      </div>
    </section>
  );
};

export default ComparisonSection;
