
import { CollegeRecommendationCard } from "./CollegeRecommendationCard"

interface CollegeRecommendation {
  college_name: string;
  branch: string;
  round: number;
  probability: string;
}

export function CollegeRecommendationsList({ recommendations }: { recommendations: CollegeRecommendation[] }) {
  if (recommendations.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">College Recommendations</h3>
      {recommendations.map((recommendation, index) => (
        <CollegeRecommendationCard key={index} recommendation={recommendation} />
      ))}
    </div>
  )
}
