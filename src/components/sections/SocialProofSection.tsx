import { Users, MapPin, Clock, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "200+",
    label: "Nomads Served",
  },
  {
    icon: MapPin,
    value: "50",
    label: "States Covered",
  },
  {
    icon: Clock,
    value: "24 hrs",
    label: "Response Time",
  },
  {
    icon: Star,
    value: "5 Star",
    label: "Client Rating",
  },
];

const SocialProofSection = () => {
  return (
    <section className="relative z-20 -mt-48 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-primary text-primary-foreground px-5 py-4 rounded-xl shadow-md flex items-center gap-3"
            >
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 opacity-90" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold">{stat.value}</span>
                <span className="text-xs md:text-sm font-medium text-primary-foreground/90">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
