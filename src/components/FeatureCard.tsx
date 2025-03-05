
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover-lift transition-all duration-300 animate-fade-in hover:border-primary/50">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300 animate-float">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
