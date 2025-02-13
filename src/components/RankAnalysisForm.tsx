
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  jee_mains_rank: z.string().transform(Number),
  jee_advanced_rank: z.string().transform(Number).optional(),
  category: z.string(),
  gender: z.string(),
  home_state: z.string(),
  counseling_type: z.enum(["josaa", "csab", "mpdter", "uptac"]),
})

export default function RankAnalysisForm() {
  const { toast } = useToast()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jee_mains_rank: "",
      jee_advanced_rank: "",
      category: "",
      gender: "",
      home_state: "",
      counseling_type: "josaa",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data: session } = await supabase.auth.getSession()
      if (!session?.session?.user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to use the rank analysis tool",
        })
        navigate("/auth")
        return
      }

      const { error } = await supabase
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

      if (error) throw error

      toast({
        title: "Analysis Request Submitted",
        description: "We'll analyze your details and provide college recommendations shortly.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit analysis request. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
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

        <Button type="submit" className="w-full">Submit for Analysis</Button>
      </form>
    </Form>
  )
}
