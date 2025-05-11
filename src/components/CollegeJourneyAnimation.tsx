
import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Award, School } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const CollegeJourneyAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const isMobile = useIsMobile();
  
  const steps = [
    { icon: <GraduationCap className="w-6 md:w-8 h-6 md:h-8" />, title: "JEE Preparation" },
    { icon: <BookOpen className="w-6 md:w-8 h-6 md:h-8" />, title: "Rank Analysis" },
    { icon: <School className="w-6 md:w-8 h-6 md:h-8" />, title: "College Selection" },
    { icon: <Award className="w-6 md:w-8 h-6 md:h-8" />, title: "Admission Success" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [steps.length]);

  const calculateDistance = () => {
    return isMobile ? 100 : 120;
  };

  return (
    <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center touch-none select-none">
      <div className="absolute w-[200px] md:w-[280px] h-[200px] md:h-[280px] bg-primary/5 rounded-full animate-pulse"></div>
      <div className="absolute w-[150px] md:w-[200px] h-[150px] md:h-[200px] bg-primary/10 rounded-full"></div>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`absolute transition-all duration-500 ${
            index === currentStep ? 'scale-110 opacity-100 z-10' : 'scale-90 opacity-40'
          }`}
          style={{
            transform: `rotate(${(index * 360) / steps.length}deg) translateY(-${calculateDistance()}px) rotate(-${
              (index * 360) / steps.length
            }deg)`,
          }}
        >
          <div className="glass-card p-3 md:p-4 rounded-xl flex flex-col items-center gap-2 hover-lift">
            {step.icon}
            <p className="text-xs md:text-sm font-medium text-foreground">{step.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollegeJourneyAnimation;
