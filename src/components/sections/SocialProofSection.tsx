import { Users, Globe, DollarSign, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Nomads Served",
  },
  {
    icon: Globe,
    value: "40+",
    label: "Countries Covered",
  },
  {
    icon: DollarSign,
    value: "$2M+",
    label: "Tax Savings",
  },
  {
    icon: Star,
    value: "5.0",
    label: "Client Rating",
  },
];

const SocialProofSection = () => {
  return (
    <section className="relative z-20 bg-primary py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 text-primary-foreground"
            >
              <stat.icon className="w-6 h-6 opacity-80" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm opacity-80">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
