import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone_number: z.string().regex(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, {
    message: "Invalid phone number",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  jee_mains_rank: z.string().optional(),
  jee_advanced_rank: z.string().optional(),
  category: z.string(),
  gender: z.string(),
  home_state: z.string(),
  counseling_type: z.enum(["josaa", "csab", "mpdter", "uptac"]).default("josaa"),
  is_pwd: z.string().optional(),
});

interface RankAnalysisFormProps {
  onAnalysisSubmitted?: (requestId: string) => void;
}

export function RankAnalysisForm({ onAnalysisSubmitted }: RankAnalysisFormProps) {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", 
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      email: "",
      jee_mains_rank: "",
      jee_advanced_rank: "",
      category: "general",
      gender: "male",
      home_state: "uttar pradesh",
      counseling_type: "josaa",
      is_pwd: "no",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIsSuccess(false);

    const formValues = {
      category: values.category,
      counseling_type: values.counseling_type,
      gender: values.gender,
      home_state: values.home_state.toLowerCase(),
      jee_mains_rank: values.jee_mains_rank ? Number(values.jee_mains_rank) : null,
      jee_advanced_rank: values.jee_advanced_rank ? Number(values.jee_advanced_rank) : null,
    };

    try {
      const { data, error } = await supabase
        .from("rank_analysis_requests")
        .insert(formValues)
        .select();

      if (error) {
        console.error("Supabase error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to submit rank analysis request. Please try again.",
        });
      } else {
        setIsSuccess(true);
        toast({
          title: "Success",
          description: "Rank analysis request submitted successfully!",
        });
        
        // Call the callback with the request ID if it exists
        if (data && data[0] && onAnalysisSubmitted) {
          setTimeout(() => {
            onAnalysisSubmitted(data[0].id);
          }, 1000);
        }
        
        form.reset();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // ... rest of the component remains the same
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isSuccess && (
          <Alert>
            <AlertDescription>
              Your details have been submitted successfully! We are analyzing your rank...
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jee_mains_rank"
            render={({ field }) => (
              <FormItem>
                <FormLabel>JEE Mains Rank</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your JEE Mains rank" {...field} />
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
                  <Input placeholder="Enter your JEE Advanced rank" {...field} />
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
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="ews">EWS</SelectItem>
                    <SelectItem value="obc-ncl">OBC-NCL</SelectItem>
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
            name="home_state"
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
          <FormField
            control={form.control}
            name="is_pwd"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PWD Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="PWD Status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" disabled={isLoading} className="w-full mt-4">
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Submit for Analysis
        </Button>
      </form>
    </Form>
  );
}
