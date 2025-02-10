
interface MentorCardProps {
  name: string;
  role: string;
  expertise: string;
  experience: string;
  image: string;
}

const MentorCard = ({ name, role, expertise, experience, image }: MentorCardProps) => {
  return (
    <div className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
      <div className="flex items-center mb-6">
        <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
        <div>
          <h3 className="text-xl font-semibold text-text">{name}</h3>
          <p className="text-primary">{role}</p>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center">
          <span className="font-medium text-text min-w-24">Expertise:</span>
          <span className="text-text-light">{expertise}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium text-text min-w-24">Experience:</span>
          <span className="text-text-light">{experience}</span>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
