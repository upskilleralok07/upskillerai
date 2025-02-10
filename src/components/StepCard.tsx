
import { ArrowRight } from "lucide-react";

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: number;
}

const StepCard = ({ icon, title, description, number }: StepCardProps) => {
  return (
    <div className="relative p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group animate-fade-in">
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-text">{title}</h3>
      <p className="text-text-light leading-relaxed">{description}</p>
      <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 hidden md:block">
        <ArrowRight className="w-6 h-6 text-primary/30" />
      </div>
    </div>
  );
};

export default StepCard;
