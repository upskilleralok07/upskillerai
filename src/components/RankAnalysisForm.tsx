
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { rankAnalysisSchema, type RankAnalysisFormData, type CollegeRecommendation } from "./rank-analysis/rankAnalysisSchema"
import { CollegeRecommendationsList } from "./rank-analysis/CollegeRecommendationsList"

export default function RankAnalysisForm() {
  const { toast } = useToast()
  const navigate = useNavigate()
  const [recommendations, setRecommendations] = useState<CollegeRecommendation[]>([])
  const [loading, setLoading] = useState(false)

  const form = useForm<RankAnalysisFormData>({
    resolver: zodResolver(rankAnalysisSchema),
    defaultValues: {
      jee_mains_rank: "",
      jee_advanced_rank: "",
      category: "",
      gender: "",
      home_state: "",
      counseling_type: "josaa",
    },
  })

  async function getCollegeRecommendations(values: RankAnalysisFormData) {
    const { data: cutoffs, error } = await supabase
      .from('college_cutoffs')
      .select(`
        cutoff_rank,
        round,
        branch,
        colleges (
          name
        )
      `)
      .eq('category', values.category)
      .lte('cutoff_rank', values.jee_mains_rank)
      .order('cutoff_rank', { ascending: false })
      .limit(10)

    if (error) throw error

    return cutoffs.map(cutoff => ({
      college_name: cutoff.colleges?.name || '',
      branch: cutoff.branch,
      round: cutoff.round,
      probability: cutoff.cutoff_rank >= values.jee_mains_rank ? 'High' : 'Medium'
    }))
  }

  async function onSubmit(values: RankAnalysisFormData) {
    try {
      setLoading(true)
      const { data: session } = await supabase.auth.getSession()
      if (!session?.session?.user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to use the rank analysis tool",
        })
        navigate("/auth")
        return
      }

      // Store the analysis request
      const { error: requestError } = await supabase
        .from("rank_analysis_requests")
        .insert({
          user_id: session.session.user.id,
          jee_mains_rank: values.jee_mains_rank,
          jee_advanced_rank: values.jee_advanced_rank,
          category: values.category,
          gender: values.gender,
          home_state: values.home_state,
          counseling_type: values.counseling_type,
        })

      if (requestError) throw requestError

      // Get college recommendations
      const collegeRecommendations = await getCollegeRecommendations(values)
      setRecommendations(collegeRecommendations)

      toast({
        title: "Analysis Complete",
        description: "Here are your college recommendations based on your rank and preferences.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze your rank. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="jee_mains_rank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>JEE Mains Rank</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter your JEE Mains rank" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jee_advanced_rank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>JEE Advanced Rank (optional)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter your JEE Advanced rank" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="GENERAL">General</SelectItem>
                    <SelectItem value="OBC">OBC</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="ST">ST</SelectItem>
                    <SelectItem value="EWS">EWS</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="home_state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home State</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your home state" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="counseling_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Counseling Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select counseling type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="josaa">JoSAA</SelectItem>
                    <SelectItem value="csab">CSAB</SelectItem>
                    <SelectItem value="mpdter">MP DTER</SelectItem>
                    <SelectItem value="uptac">UPTAC</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Analyzing..." : "Submit for Analysis"}
          </Button>
        </form>
      </Form>

      <CollegeRecommendationsList recommendations={recommendations} />
    </div>
  )
}
