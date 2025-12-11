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
    <section className="relative z-20 -mt-32 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-16 justify-items-center">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 text-primary"
            >
              <stat.icon className="w-5 h-5 md:w-6 md:h-6 opacity-80" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold">{stat.value}</span>
                <span className="text-xs md:text-sm text-muted-foreground">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
