
interface MentorCardProps {
  name: string;
  role: string;
  expertise: string;
  experience: string;
  image: string;
}

const MentorCard = ({ name, role, expertise, experience, image }: MentorCardProps) => {
  return (
    <div className="p-6 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in border border-border">
      <div className="flex items-center mb-6">
        <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
        <div>
          <h3 className="text-xl font-semibold text-foreground">{name}</h3>
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
