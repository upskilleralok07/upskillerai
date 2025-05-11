
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon, RocketIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  rankInput: z.coerce.number()
    .min(1, "Rank must be at least 1")
    .optional()
    .or(z.literal("")),
  examType: z.enum(["jee_main", "jee_advanced", "bitsat", "wbjee", "viteee", "comedk"]),
  homeState: z.string().min(2, "Please select your home state"),
  category: z.enum(["general", "ews", "obc", "sc", "st"]),
  gender: z.enum(["male", "female", "other"]),
  email: z.string().email("Please enter a valid email").optional(),
});

export function FreeRankAnalysis() {
  const { toast } = useToast();
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<null | {
    colleges: Array<{name: string, chance: string, branch: string}>;
  }>(null);
  const [showForm, setShowForm] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rankInput: "",
      examType: "jee_main",
      homeState: "",
      category: "general",
      gender: "male",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsAnalysisLoading(true);
    
    try {
      // Mock response - in a real implementation, this would be an API call
      setTimeout(() => {
        // Example result
        setAnalysisResult({
          colleges: [
            { name: "NIT Trichy", chance: "High", branch: "Computer Science" },
            { name: "IIIT Bangalore", chance: "Medium", branch: "Electronics & Communication" },
            { name: "BITS Pilani", chance: "Low", branch: "Mechanical Engineering" },
          ]
        });
        setShowForm(false);
        setIsAnalysisLoading(false);
        
        toast({
          title: "Analysis Complete",
          description: "We've analyzed your rank and prepared recommendations",
        });
      }, 2000);
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Unable to process your request. Please try again.",
      });
      setIsAnalysisLoading(false);
    }
  }

  const resetAnalysis = () => {
    setAnalysisResult(null);
    setShowForm(true);
    form.reset();
  };

  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", 
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const getChanceColor = (chance: string) => {
    switch (chance.toLowerCase()) {
      case "high":
        return "text-green-600";
      case "medium":
        return "text-amber-600";
      case "low":
        return "text-red-600";
      default:
        return "text-foreground";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {showForm ? (
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Free College Predictor</h2>
            <p className="text-muted-foreground">
              Enter your rank and details to get a free analysis of colleges and branches you can target
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="rankInput"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Rank</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your rank" 
                          {...field} 
                          value={field.value === undefined ? "" : field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="examType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Exam Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select exam" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="jee_main">JEE Main</SelectItem>
                          <SelectItem value="jee_advanced">JEE Advanced</SelectItem>
                          <SelectItem value="bitsat">BITSAT</SelectItem>
                          <SelectItem value="wbjee">WBJEE</SelectItem>
                          <SelectItem value="viteee">VITEEE</SelectItem>
                          <SelectItem value="comedk">COMEDK</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="homeState"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Home State</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state.toLowerCase()}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="ews">EWS</SelectItem>
                          <SelectItem value="obc">OBC-NCL</SelectItem>
                          <SelectItem value="sc">SC</SelectItem>
                          <SelectItem value="st">ST</SelectItem>
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
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        For receiving detailed analysis report
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isAnalysisLoading}>
                {isAnalysisLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                Get College Predictions
              </Button>
            </form>
          </Form>
        </Card>
      ) : (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your College Predictions</h2>
              <p className="text-muted-foreground">
                Based on your rank and preferences, here are your college chances
              </p>
            </div>
            <Button variant="outline" onClick={resetAnalysis}>
              Start New Analysis
            </Button>
          </div>
          
          <div className="space-y-4 mb-6">
            {analysisResult?.colleges.map((college, index) => (
              <div 
                key={index} 
                className="p-4 border rounded-lg hover:shadow-md transition-shadow flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-lg">{college.name}</h3>
                  <p className="text-muted-foreground">{college.branch}</p>
                </div>
                <div className={`font-medium ${getChanceColor(college.chance)}`}>
                  {college.chance} Chance
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
              <RocketIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-1">Want a more accurate analysis?</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Our premium counselors can provide personalized guidance based on your exact profile and preferences
              </p>
              <Button>Book Premium Counseling Session</Button>
            </div>
          </div>
        </Card>
      )}
      
      <div className="mt-8 text-sm text-muted-foreground text-center">
        Note: This is a free tool that provides estimates based on previous years' data. 
        For precise guidance tailored to your exact profile, consider our personalized counseling services.
      </div>
    </div>
  );
}
