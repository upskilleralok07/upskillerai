import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  rank: z.string().transform((val) => Number(val)),
  category: z.string(),
  category_rank: z.string().transform((val) => Number(val)),
  state: z.string(),
});

type RankAnalysisFormData = z.infer<typeof formSchema>;

export function RankAnalysisForm() {
  const { toast } = useToast();
  const form = useForm<RankAnalysisFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rank: "",
      category: "",
      category_rank: "",
      state: "",
    },
  });

  const onSubmit = async (data: RankAnalysisFormData) => {
    try {
      const { error } = await supabase.from("rank_analysis").insert([
        {
          rank: Number(data.rank),
          category: data.category,
          category_rank: Number(data.category_rank),
          state: data.state,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Analysis Submitted",
        description: "We'll analyze your rank and get back to you soon!",
      });

      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="rank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>JEE Main Rank</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your JEE Main rank"
                  {...field}
                  className="hover-lift"
                />
              </FormControl>
              <FormDescription>
                Enter your JEE Main 2024 common rank
              </FormDescription>
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
                  <SelectTrigger className="hover-lift">
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
              <FormDescription>Select your reservation category</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category_rank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Rank</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your category rank"
                  {...field}
                  className="hover-lift"
                />
              </FormControl>
              <FormDescription>
                Enter your rank in your selected category
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="hover-lift">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UP">Uttar Pradesh</SelectItem>
                  <SelectItem value="MP">Madhya Pradesh</SelectItem>
                  <SelectItem value="DL">Delhi</SelectItem>
                  <SelectItem value="MH">Maharashtra</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select your state of domicile</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full gradient-bg hover-lift text-white"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Analyzing..." : "Analyze My Rank"}
        </Button>
      </form>
    </Form>
  );
}
