
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CollegeRecommendation {
  college_name: string;
  branch: string;
  round: number;
  probability: string;
}

export function CollegeRecommendationCard({ recommendation }: { recommendation: CollegeRecommendation }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{recommendation.college_name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><span className="font-medium">Branch:</span> {recommendation.branch}</p>
          <p><span className="font-medium">Round:</span> {recommendation.round}</p>
          <p><span className="font-medium">Admission Probability:</span> 
            <span className={`ml-2 px-2 py-1 rounded text-sm ${
              recommendation.probability === 'High' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {recommendation.probability}
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
