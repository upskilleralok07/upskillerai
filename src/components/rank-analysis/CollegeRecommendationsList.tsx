
import { CollegeRecommendationCard } from "./CollegeRecommendationCard"

interface CollegeRecommendation {
  college_name: string;
  branch: string;
  round: number;
  probability: string;
}

export function CollegeRecommendationsList({ recommendations }: { recommendations: CollegeRecommendation[] }) {
  if (!recommendations || recommendations.length === 0) return (
    <div className="text-center py-8">
      <p className="text-muted-foreground">No college recommendations available yet.</p>
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">College Recommendations</h3>
      {recommendations.map((recommendation, index) => (
        <CollegeRecommendationCard key={index} recommendation={recommendation} />
      ))}
    </div>
  )
}
