
import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Award, School } from 'lucide-react';

const CollegeJourneyAnimation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { icon: <GraduationCap className="w-8 h-8" />, title: "JEE Preparation" },
    { icon: <BookOpen className="w-8 h-8" />, title: "Rank Analysis" },
    { icon: <School className="w-8 h-8" />, title: "College Selection" },
    { icon: <Award className="w-8 h-8" />, title: "Admission Success" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div className="absolute w-[280px] h-[280px] bg-primary/5 rounded-full animate-pulse" />
      <div className="absolute w-[200px] h-[200px] bg-primary/10 rounded-full" />
      {steps.map((step, index) => (
        <div
          key={index}
          className={`absolute transition-all duration-500 ${
            index === currentStep ? 'scale-110 opacity-100' : 'scale-90 opacity-40'
          }`}
          style={{
            transform: `rotate(${(index * 360) / steps.length}deg) translateY(-120px) rotate(-${
              (index * 360) / steps.length
            }deg)`,
          }}
        >
          <div className="glass-card p-4 rounded-xl flex flex-col items-center gap-2 hover-lift">
            {step.icon}
            <p className="text-sm font-medium text-foreground">{step.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollegeJourneyAnimation;
