
import React from "react";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MentorshipCard from "@/components/MentorshipCard";
import Navbar from "@/components/Navbar";

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Free Rank Analysis",
      description: "Get detailed college recommendations based on your JEE rank and preferences",
      features: [
        "Rank-based college analysis",
        "Support for JoSAA, CSAB, MPDTER, UPTAC",
        "Category-wise predictions",
        "Basic placement statistics"
      ],
      price: "Free",
      planType: "free" as const,
    },
    {
      title: "One-on-One Expert Mentorship",
      description: "Personalized guidance from experienced mentors",
      features: [
        "1-hour mentorship call",
        "Detailed college analysis",
        "Admission strategy",
        "Query resolution",
        "Access to all career roadmaps",
        "Premium study resources",
        "Category-wise cutoff analysis"
      ],
      price: "₹399",
      planType: "premium" as const,
      featured: true,
    },
    {
      title: "Personalized College Roadmap",
      description: "Comprehensive guidance for your college journey",
      features: [
        "2 mentorship sessions",
        "Detailed roadmap",
        "Regular follow-ups",
        "Parent counseling",
        "Career path planning",
        "15+ Career Roadmaps",
        "Advanced college predictions",
        "Branch-wise analysis"
      ],
      price: "₹699",
      planType: "premium" as const,
    },
  ];

  const faqs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major payment methods including UPI, Paytm, Credit/Debit Cards, Net Banking, and Razorpay.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Yes, you can upgrade your plan at any time. The price difference will be prorated for the remaining period.",
    },
    {
      question: "Is there a refund policy?",
      answer:
        "Yes, we offer a 7-day money-back guarantee if you're not satisfied with our services.",
    },
    {
      question: "How long are the mentorship calls?",
      answer:
        "Standard plan includes two 30-minute calls, while Premium plan offers unlimited 45-minute calls.",
    },
    {
      question: "What is included in the AI analysis?",
      answer:
        "Our AI analysis provides personalized insights about your preparation level, weak areas, and recommended study strategy based on your performance data.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Success Path
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Select the plan that best fits your preparation needs. All plans
            include access to our core features and community support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <MentorshipCard
              key={plan.title}
              {...plan}
            />
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
