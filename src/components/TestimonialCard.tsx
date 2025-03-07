
import { User } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  college: string;
  testimonial: string;
  imageSrc?: string;
}

const TestimonialCard = ({ name, college, testimonial, imageSrc }: TestimonialCardProps) => {
  return (
    <div className="glass-card p-6 rounded-2xl border border-primary/10 hover-lift transition-all duration-300 animate-fade-in">
      <div className="flex items-center mb-4">
        <div className="mr-4">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={name} 
              className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-lg text-foreground">{name}</h3>
          <p className="text-sm text-primary">{college}</p>
        </div>
      </div>
      <div className="relative">
        <blockquote className="text-muted-foreground italic">
          "{testimonial}"
        </blockquote>
        <div className="absolute -top-4 -left-2 text-4xl text-primary/10">"</div>
        <div className="absolute -bottom-4 -right-2 text-4xl text-primary/10">"</div>
      </div>
    </div>
  );
};

export default TestimonialCard;
