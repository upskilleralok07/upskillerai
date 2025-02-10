
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200 hover:shadow-xl transition-all duration-300 animate-fade-in">
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-text">{title}</h3>
      <p className="text-text-light leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
