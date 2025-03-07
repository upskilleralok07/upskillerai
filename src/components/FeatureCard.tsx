
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group p-5 md:p-6 rounded-2xl glass-card border border-primary/10 hover-lift transition-all duration-300 animate-fade-in hover:border-primary/30 h-full">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300 animate-float">
        <div className="text-2xl md:text-3xl">{icon}</div>
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
