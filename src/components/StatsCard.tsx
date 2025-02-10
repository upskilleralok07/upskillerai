
interface StatsCardProps {
  title: string;
  value: string;
  description: string;
}

const StatsCard = ({ title, value, description }: StatsCardProps) => {
  return (
    <div className="p-6 rounded-2xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 text-center animate-fade-in border border-border">
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <div className="text-4xl font-bold text-primary mb-2">{value}</div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default StatsCard;
