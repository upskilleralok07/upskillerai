import { ChartBar, GraduationCap, User, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import StepCard from "@/components/StepCard";
import MentorshipCard from "@/components/MentorshipCard";
import MentorCard from "@/components/MentorCard";
import StatsCard from "@/components/StatsCard";
import Navbar from "@/components/Navbar";
import JoinWhatsApp from "@/components/JoinWhatsApp";

const Services = () => {
  const { data: roadmaps } = useQuery({
    queryKey: ["roadmaps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("study_resources")
        .select("*")
        .eq('resource_type', 'roadmap')
        .order('title', { ascending: true });
      
      if (error) {
        console.error("Error fetching roadmaps:", error);
        throw error;
      }
      return data;
    },
  });

  const steps = [
    {
      title: "Submit Your Details",
      description: "Share your JEE rank and college preferences with us",
      icon: <User className="w-6 h-6 text-primary" />,
    },
    {
      title: "Get Expert Analysis",
      description: "Receive a detailed analysis of your college options",
      icon: <ChartBar className="w-6 h-6 text-primary" />,
    },
    {
      title: "Connect with Mentor",
      description: "Get personalized guidance from experienced mentors",
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: "Secure Admission",
      description: "Successfully enroll in your dream college",
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
    },
  ];

  const mentorshipOptions = [
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
      featured: true,
      planType: "premium" as const,
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
        `${roadmaps?.length || '15+'} Career Roadmaps`,
        "Advanced college predictions",
        "Branch-wise analysis"
      ],
      price: "₹699",
      planType: "premium" as const,
    },
  ];

  const mentors = [
    {
      name: "Alok Sharma",
      role: "Founder - Upskiller & CollegeSarthi",
      expertise: "College Counseling & Career Guidance",
      experience: "Expert Mentor",
      image: "/lovable-uploads/3b1c05fb-b051-4025-8490-a85e953996ae.png",
    }
  ];

  const stats = [
    {
      title: "IIT Placements",
      value: "500+",
      description: "Students placed in IITs",
    },
    {
      title: "NIT Success",
      value: "1000+",
      description: "Students in NITs",
    },
    {
      title: "Satisfaction Rate",
      value: "98%",
      description: "Happy students",
    },
    {
      title: "Mentorship Hours",
      value: "5000+",
      description: "Of guidance provided",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/5 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      
      {/* How It Works Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4">
            How It Works
          </h2>
          <p className="text-text-light text-center max-w-2xl mx-auto mb-12">
            Our step-by-step mentorship program guides you through the college selection process
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StepCard
                key={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
                number={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mentorship Options Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4">
            Mentorship Options
          </h2>
          <p className="text-text-light text-center max-w-2xl mx-auto mb-12">
            Choose the mentorship package that best suits your needs
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {mentorshipOptions.map((option, index) => (
              <MentorshipCard key={index} {...option} />
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Mentors Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-text dark:text-white mb-4">
            Meet Our Founder
          </h2>
          <p className="text-text-light dark:text-gray-300 text-center max-w-2xl mx-auto mb-12">
            Learn from experienced professionals who have guided thousands of students
          </p>
          <div className="grid md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            {mentors.map((mentor, index) => (
              <MentorCard key={index} {...mentor} />
            ))}
          </div>
          
          {/* WhatsApp Join Section */}
          <div className="mt-16">
            <JoinWhatsApp />
          </div>
        </div>
      </section>

      {/* Success Rate Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4">
            Our Success Stories
          </h2>
          <p className="text-text-light text-center max-w-2xl mx-auto mb-12">
            Join thousands of students who achieved their college dreams with us
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
