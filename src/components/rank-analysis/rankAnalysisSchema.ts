
import * as z from "zod"

export const rankAnalysisSchema = z.object({
  jee_mains_rank: z.string().transform((val) => parseInt(val, 10)),
  jee_advanced_rank: z.string().transform((val) => val ? parseInt(val, 10) : undefined).optional(),
  category: z.string(),
  gender: z.string(),
  home_state: z.string(),
  counseling_type: z.enum(["josaa", "csab", "mpdter", "uptac"]),
})

export type RankAnalysisFormData = z.infer<typeof rankAnalysisSchema>

export interface CollegeRecommendation {
  college_name: string;
  branch: string;
  round: number;
  probability: string;
}
