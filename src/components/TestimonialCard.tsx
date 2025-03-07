
import { User } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  college: string;
  testimonial: string;
  imageSrc?: string;
}

const TestimonialCard = ({ name, college, testimonial, imageSrc }: TestimonialCardProps) => {
  return (
    <div className="glass-card p-5 md:p-6 rounded-2xl border border-primary/10 hover-lift transition-all duration-300 animate-fade-in h-full">
      <div className="flex items-center mb-4">
        <div className="mr-3 md:mr-4">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={name} 
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-primary/20"
            />
          ) : (
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium text-base md:text-lg text-foreground">{name}</h3>
          <p className="text-xs md:text-sm text-primary">{college}</p>
        </div>
      </div>
      <div className="relative">
        <blockquote className="text-sm md:text-base text-muted-foreground italic">
          "{testimonial}"
        </blockquote>
        <div className="absolute -top-4 -left-2 text-3xl md:text-4xl text-primary/10">"</div>
        <div className="absolute -bottom-4 -right-2 text-3xl md:text-4xl text-primary/10">"</div>
      </div>
    </div>
  );
};

export default TestimonialCard;
