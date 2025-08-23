
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import { JourneyStarterButton } from "@/components/JourneyStarter";
import TestimonialCard from "@/components/TestimonialCard";
import CollegeJourneyAnimation from "@/components/CollegeJourneyAnimation";
import TypewriterEffect from "@/components/TypewriterEffect";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-primary/5 dark:from-background dark:via-background/80 dark:to-primary/10">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="lg:w-1/2 text-left animate-fade-in">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
                Find Your <span className="gradient-text">Dream College</span> with Expert Guidance!
              </h1>
              <div className="text-xl md:text-2xl text-muted-foreground mb-6 md:mb-8 h-12 flex items-center">
                Get the best <TypewriterEffect 
                  texts={["Placements", "Grades", "Dream College"]} 
                  className="gradient-text font-semibold"
                /> with our guidance!
              </div>
              <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
                Join thousands of students who have transformed their college admission journey with our expert mentorship and AI-powered recommendations.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <a href="/courses">Start Learning</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/courses">Explore Courses</a>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 animate-fade-in w-full" style={{ animationDelay: "0.3s" }}>
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg hover-lift transition-all duration-300 glass-card">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/kdPIQCKMjE8?autoplay=1"
                  title="Welcome Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Animation Section */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-text dark:text-foreground mb-6 md:mb-8">
            How It <span className="gradient-text">Works</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <CollegeJourneyAnimation />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="glass-card p-6 md:p-8 rounded-xl text-center animate-pulse-subtle">
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">500+</div>
              <div className="text-text-light dark:text-foreground/70">Students in IITs</div>
            </div>
            <div className="glass-card p-6 md:p-8 rounded-xl text-center animate-pulse-subtle" style={{ animationDelay: "0.2s" }}>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">98%</div>
              <div className="text-text-light dark:text-foreground/70">Satisfaction Rate</div>
            </div>
            <div className="glass-card p-6 md:p-8 rounded-xl text-center animate-pulse-subtle" style={{ animationDelay: "0.4s" }}>
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">5000+</div>
              <div className="text-text-light dark:text-foreground/70">Mentorship Hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-text dark:text-foreground mb-3 md:mb-4">
            Why Choose <span className="gradient-text">College Sarthi</span>?
          </h2>
          <p className="text-text-light dark:text-foreground/70 text-center max-w-2xl mx-auto mb-8 md:mb-12">
            We provide comprehensive guidance to help you make informed decisions about your academic future.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <FeatureCard
              icon={<span className="text-2xl">🎯</span>}
              title="Personalized Recommendations"
              description="Get college recommendations tailored to your JEE rank, preferences, and career goals."
            />
            <FeatureCard
              icon={<span className="text-2xl">👥</span>}
              title="Expert Mentorship"
              description="Connect with experienced mentors who guide you through the college selection process."
            />
            <FeatureCard
              icon={<span className="text-2xl">🤖</span>}
              title="AI-based Rank Analyzer"
              description="Leverage our advanced AI technology to analyze your rank and predict college chances."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 px-4 md:px-6 bg-white dark:bg-background/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-text dark:text-foreground mb-3 md:mb-4">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-text-light dark:text-foreground/70 text-center max-w-2xl mx-auto mb-8 md:mb-12">
            Hear from students who transformed their college admission journey with us
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <TestimonialCard 
              name="Rahul Sharma"
              college="IIT Bombay"
              testimonial="College Sarthi's guidance was instrumental in helping me secure a seat at IIT Bombay. Their mentors provided invaluable insights!"
              imageSrc="/placeholder.svg"
            />
            <TestimonialCard 
              name="Priya Patel"
              college="NIT Trichy"
              testimonial="The rank analyzer gave me accurate predictions. I got admission to my dream college thanks to their personalized counseling."
              imageSrc="/placeholder.svg"
            />
            <TestimonialCard 
              name="Aman Gupta"
              college="IIIT Hyderabad"
              testimonial="College Sarthi's roadmap helped me understand what to expect during the admission process. Highly recommended for JEE aspirants!"
              imageSrc="/placeholder.svg"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
