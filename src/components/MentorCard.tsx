
interface MentorCardProps {
  name: string;
  role: string;
  expertise: string;
  experience: string;
  image: string;
}

const MentorCard = ({ name, role, expertise, experience, image }: MentorCardProps) => {
  return (
    <div className="p-6 rounded-2xl bg-card shadow-lg hover-lift hover:border-primary/50 transition-all duration-300 animate-fade-in border border-border">
      <div className="flex flex-col md:flex-row items-center mb-6">
        <div className="relative mb-4 md:mb-0 md:mr-6">
          <div className="w-20 h-20 rounded-full bg-primary/20 absolute -inset-1.5 animate-pulse-subtle"></div>
          <img src={image} alt={name} className="w-20 h-20 rounded-full object-cover relative z-10" />
        </div>
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-foreground gradient-text">{name}</h3>
          <p className="text-primary">{role}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center">
          <span className="font-medium text-foreground min-w-24">Expertise:</span>
          <span className="text-muted-foreground">{expertise}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-foreground min-w-24">Experience:</span>
          <span className="text-muted-foreground">{experience}</span>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
