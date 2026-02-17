/**
 * Tax Maintenance Packages Page
 * Sub-page under Services displaying monthly tax maintenance pricing.
 */

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useQuiz } from "@/contexts/QuizContext";
import { servicesHero } from "@/assets";
import usePageMeta from "@/hooks/usePageMeta";

const packages = [
  {
    name: "1040 Return",
    price: 150,
    period: "/month",
    note: "Starting price*",
    features: [
      "Monthly bookkeeping review",
      "Quarterly tax estimate calculations",
      "Year-end tax preparation",
      "Deduction tracking & optimization",
      "Email support",
    ],
    footnote: "*Price may vary based on complexity of return",
  },
  {
    name: "1065 Partnership Return",
    price: 350,
    period: "/month",
    note: "Starting price*",
    features: [
      "Monthly bookkeeping review",
      "Quarterly tax estimate calculations",
      "Year-end partnership return preparation",
      "K-1 distribution scheduling",
      "Deduction tracking & optimization",
      "Priority email support",
    ],
    footnote: "*Price may vary based on number of partners and complexity",
  },
  {
    name: "1120S S Corp Return",
    price: 350,
    period: "/month",
    note: "Starting price*",
    features: [
      "Monthly bookkeeping review",
      "Quarterly tax estimate calculations",
      "Year-end S Corp return preparation",
      "Reasonable compensation analysis",
      "Deduction tracking & optimization",
      "Priority email support",
    ],
    footnote: "*Price may vary based on complexity of return",
  },
];

const TaxMaintenance = () => {
  const { openQuiz } = useQuiz();

  usePageMeta(
    "Tax Maintenance Packages | Tax Queen",
    "Monthly tax maintenance plans for digital nomads. Bookkeeping review, quarterly estimates, and year-end preparation starting at $150/month."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        {/* Hero Banner */}
        <section className="pt-24 pb-8 md:pt-28 md:pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden h-[280px] md:h-[320px]">
              <img
                src={servicesHero}
                alt="White RV motorhome with camping chairs at vibrant sunset"
                width={1200}
                height={800}
                fetchPriority="high"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/50" />
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-2xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white uppercase leading-tight">
                  Tax Maintenance Packages
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="bg-background rounded-2xl shadow-md border border-border overflow-hidden flex flex-col"
                >
                  {/* Card Header */}
                  <div className="bg-primary px-6 py-5 text-center">
                    <h3 className="text-lg font-bold text-primary-foreground uppercase">
                      {pkg.name}
                    </h3>
                    <p className="text-primary-foreground/80 text-sm mt-1">
                      {pkg.note}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="px-6 py-8 text-center border-b border-border">
                    <span className="text-4xl font-bold text-foreground">
                      ${pkg.price}
                    </span>
                    <span className="text-muted-foreground text-lg">
                      {pkg.period}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="px-6 py-6 flex-1">
                    <ul className="space-y-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA + Footnote */}
                  <div className="px-6 pb-6 mt-auto space-y-3">
                    <Button
                      variant="cta"
                      size="lg"
                      className="w-full"
                      onClick={() => openQuiz()}
                    >
                      Get Started
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      {pkg.footnote}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TaxMaintenance;
