
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CollegeRecommendation {
  college_name: string;
  branch: string;
  round: number;
  probability: string;
}

export function CollegeRecommendationCard({ recommendation }: { recommendation: CollegeRecommendation }) {
  const getProbabilityColor = (probability: string) => {
    switch (probability.toLowerCase()) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{recommendation.college_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <div>
            <p><span className="font-medium">Branch:</span> {recommendation.branch}</p>
            <p><span className="font-medium">Round:</span> {recommendation.round}</p>
          </div>
          <div>
            <span 
              className={`px-3 py-1 rounded-full text-sm font-medium ${getProbabilityColor(recommendation.probability)}`}
            >
              {recommendation.probability} Chance
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
