import { Car, Caravan, Plane, Ship, MapPin, Flag } from "lucide-react";
import { motion } from "framer-motion";

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

// Weighted progress - early questions advance faster
const getWeightedProgress = (step: number, total: number): number => {
  // Create a weighted curve that frontloads progress
  // Steps 1-3: fast progress (0-45%)
  // Steps 4-end: slower progress (45-100%)
  const progressMap: Record<number, number> = {
    1: 15,
    2: 30,
    3: 45,
    4: 55,
    5: 65,
    6: 75,
    7: 82,
    8: 89,
    9: 95,
    10: 100,
  };
  
  // For any step, use the map or calculate proportionally
  if (progressMap[step]) {
    return progressMap[step];
  }
  
  // Fallback for different total steps
  return Math.min(100, (step / total) * 100);
};

// Get vehicle based on step number (cycles through: Car → RV → Plane → Boat → repeat)
const getVehicleByStep = (step: number) => {
  const vehicles = [
    { Icon: Car, label: "Car" },
    { Icon: Caravan, label: "RV" },
    { Icon: Plane, label: "Plane" },
    { Icon: Ship, label: "Boat" },
  ];
  // Cycle through vehicles: Q1=Car, Q2=RV, Q3=Plane, Q4=Boat, Q5=Car...
  return vehicles[(step - 1) % 4];
};

const QuizProgress = ({ currentStep, totalSteps }: QuizProgressProps) => {
  const progress = getWeightedProgress(currentStep, totalSteps);
  const { Icon: VehicleIcon, label } = getVehicleByStep(currentStep);

  return (
    <div className="w-full px-4 py-6">
      {/* Journey Path */}
      <div className="relative h-12">
        {/* Background Road */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-muted rounded-full overflow-hidden">
          {/* Progress Fill */}
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* Start Marker */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 -ml-1">
          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-md">
            <MapPin className="w-3 h-3" />
          </div>
        </div>

        {/* Moving Vehicle */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2"
          initial={{ left: "0%" }}
          animate={{ left: `calc(${progress}% - 16px)` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className="w-8 h-8 rounded-full bg-background border-2 border-primary shadow-lift flex items-center justify-center"
            animate={{ y: [0, -3, 0] }}
            transition={{ 
              duration: 0.5, 
              repeat: Infinity, 
              repeatDelay: 1,
              ease: "easeInOut" 
            }}
          >
            <VehicleIcon className="w-4 h-4 text-primary" />
          </motion.div>
        </motion.div>

        {/* Finish Flag */}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 -mr-1">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md transition-colors ${
              progress >= 100
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Flag className="w-3 h-3" />
          </div>
        </div>

        {/* Milestone dots - subtle indicators along the path */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-8">
          {[25, 50, 75].map((milestone) => (
            <div
              key={milestone}
              className={`w-2 h-2 rounded-full transition-colors ${
                progress >= milestone ? "bg-primary" : "bg-muted-foreground/30"
              }`}
              style={{ marginLeft: `${milestone - 12.5}%` }}
            />
          ))}
        </div>
      </div>

      {/* Subtle vehicle label - no step counter */}
      <div className="mt-2 text-center">
        <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">
          {label} leg of your journey
        </span>
      </div>
    </div>
  );
};

export default QuizProgress;
