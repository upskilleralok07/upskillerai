
import { ChartBar, GraduationCap, User, Users, BookOpen, MapPin, Target, Brain } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import StepCard from "@/components/StepCard";
import MentorshipCard from "@/components/MentorshipCard";
import MentorCard from "@/components/MentorCard";
import StatsCard from "@/components/StatsCard";
import Navbar from "@/components/Navbar";
import JoinWhatsApp from "@/components/JoinWhatsApp";
import FeatureCard from "@/components/FeatureCard";

const CollegeSarthiServices = () => {
  const { data: roadmaps } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_resources")
        .select("*")
        .eq('resource_type', 'roadmap')
        .order('title', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const services = [
    { icon: <Target className="text-2xl" />, title: "College Selection Guidance", description: "Get expert recommendations on the best colleges matching your rank, preferences, and career goals." },
    { icon: <BookOpen className="text-2xl" />, title: "Branch Selection Help", description: "Understand the scope, placements, and future prospects of every engineering branch before choosing." },
    { icon: <MapPin className="text-2xl" />, title: "MP DTE Counselling Support", description: "Complete guidance for MP DTE counselling process including choice filling, seat allotment, and document verification." },
    { icon: <GraduationCap className="text-2xl" />, title: "Admission Guidance", description: "End-to-end support for JoSAA, CSAB, UPTAC, and state-level counselling processes." },
    { icon: <Brain className="text-2xl" />, title: "Career Counselling", description: "Personalized career path planning based on your interests, skills, and market trends." },
    { icon: <Users className="text-2xl" />, title: "Personalized Mentorship", description: "One-on-one sessions with experienced mentors who guide you through every step of your journey." },
  ];

  const steps = [
    { title: "Submit Your Details", description: "Share your JEE rank and college preferences with us", icon: <User className="w-6 h-6 text-primary" /> },
    { title: "Get Expert Analysis", description: "Receive a detailed analysis of your college options", icon: <ChartBar className="w-6 h-6 text-primary" /> },
    { title: "Connect with Mentor", description: "Get personalized guidance from experienced mentors", icon: <Users className="w-6 h-6 text-primary" /> },
    { title: "Secure Admission", description: "Successfully enroll in your dream college", icon: <GraduationCap className="w-6 h-6 text-primary" /> },
  ];

  const mentorshipOptions = [
    {
      title: "Free Rank Analysis",
      description: "Get detailed college recommendations based on your JEE rank",
      features: ["Rank-based college analysis", "Support for JoSAA, CSAB, MPDTER, UPTAC", "Category-wise predictions", "Basic placement statistics"],
      price: "Free",
      planType: "free" as const,
    },
    {
      title: "One-on-One Expert Mentorship",
      description: "Personalized guidance from experienced mentors",
      features: ["1-hour mentorship call", "Detailed college analysis", "Admission strategy", "Query resolution", "Access to all career roadmaps", "Premium study resources", "Category-wise cutoff analysis"],
      price: "₹399",
      featured: true,
      planType: "premium" as const,
    },
    {
      title: "Personalized College Roadmap",
      description: "Comprehensive guidance for your college journey",
      features: ["2 mentorship sessions", "Detailed roadmap", "Regular follow-ups", "Parent counseling", "Career path planning", `${roadmaps?.length || '15+'} Career Roadmaps`, "Advanced college predictions", "Branch-wise analysis"],
      price: "₹699",
      planType: "premium" as const,
    },
  ];

  const stats = [
    { title: "IIT Placements", value: "500+", description: "Students placed in IITs" },
    { title: "NIT Success", value: "1000+", description: "Students in NITs" },
    { title: "Satisfaction Rate", value: "98%", description: "Happy students" },
    { title: "Mentorship Hours", value: "5000+", description: "Of guidance provided" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-12 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            <span className="gradient-text">College Sarthi</span> Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete college counselling, admission guidance, and personalized mentorship for engineering aspirants.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">Our Counselling Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FeatureCard key={i} icon={s.icon} title={s.title} description={s.description} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">How It Works</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">Our step-by-step mentorship program guides you through the college selection process</p>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <StepCard key={i} title={step.title} description={step.description} icon={step.icon} number={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship Options */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">Mentorship Plans</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">Choose the mentorship package that best suits your needs</p>
          <div className="grid md:grid-cols-3 gap-6">
            {mentorshipOptions.map((option, i) => (
              <MentorshipCard key={i} {...option} />
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">Meet Our Founder</h2>
          <div className="max-w-2xl mx-auto">
            <MentorCard name="Alok Sharma" role="Founder - Upskiller & CollegeSarthi" expertise="College Counseling & Career Guidance" experience="Expert Mentor" image="/lovable-uploads/3b1c05fb-b051-4025-8490-a85e953996ae.png" />
          </div>
          <div className="mt-12"><JoinWhatsApp /></div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">Our Success Stories</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <StatsCard key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollegeSarthiServices;
