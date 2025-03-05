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
  category: z.string().optional(),
  gender: z.string().optional(),
  is_pwd: z.string().optional(),
});

export function RankAnalysisForm() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      email: "",
      jee_mains_rank: "",
      jee_advanced_rank: "",
      category: "",
      gender: "",
      is_pwd: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setIsSuccess(false);

    const formValues = {
      name: values.name,
      phone_number: values.phone_number,
      email: values.email,
      jee_mains_rank: values.jee_mains_rank ? Number(values.jee_mains_rank) : null,
      jee_advanced_rank: values.jee_advanced_rank ? Number(values.jee_advanced_rank) : null,
      category: values.category,
      gender: values.gender,
      is_pwd: values.is_pwd,
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {isSuccess && (
          <Alert>
            <AlertDescription>
              Your details have been submitted successfully! We will get back to
              you soon.
            </AlertDescription>
          </Alert>
        )}
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
              <FormLabel>JEE Mains Rank (optional)</FormLabel>
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
              <FormLabel>Category (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your gender" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="is_pwd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PWD (optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter yes if pwd else no" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading && (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
}
