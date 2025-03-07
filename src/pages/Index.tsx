import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import { JourneyStarterButton } from "@/components/JourneyStarter";
import { AIRankAnalyzer } from "@/components/AIRankAnalyzer";
import TestimonialCard from "@/components/TestimonialCard";
import CollegeJourneyAnimation from "@/components/CollegeJourneyAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-primary/5 dark:from-background dark:via-background/80 dark:to-primary/10">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-left animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-text dark:text-foreground mb-6 leading-tight">
                Find Your <span className="gradient-text">Dream College</span> with Expert Guidance!
              </h1>
              <p className="text-xl text-text-light dark:text-foreground/70 mb-8">
                Get personalized recommendations and mentorship to secure your ideal college admission with our AI-powered platform.
              </p>
              <div className="flex items-center gap-4">
                <JourneyStarterButton />
                <a href="#ai-assistant" className="px-6 py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/5 transition-all duration-300 flex items-center hover-lift">
                  Try AI Assistant <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
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
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-foreground mb-8">
            How It <span className="gradient-text">Works</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <CollegeJourneyAnimation />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="glass-card p-8 rounded-xl text-center animate-pulse-subtle">
              <div className="text-4xl font-bold gradient-text mb-2">500+</div>
              <div className="text-text-light dark:text-foreground/70">Students in IITs</div>
            </div>
            <div className="glass-card p-8 rounded-xl text-center animate-pulse-subtle" style={{ animationDelay: "0.2s" }}>
              <div className="text-4xl font-bold gradient-text mb-2">98%</div>
              <div className="text-text-light dark:text-foreground/70">Satisfaction Rate</div>
            </div>
            <div className="glass-card p-8 rounded-xl text-center animate-pulse-subtle" style={{ animationDelay: "0.4s" }}>
              <div className="text-4xl font-bold gradient-text mb-2">5000+</div>
              <div className="text-text-light dark:text-foreground/70">Mentorship Hours</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Rank Analyzer Section */}
      <section id="ai-assistant" className="py-16 px-6 bg-muted/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text dark:text-foreground mb-4">
              Ask Our <span className="gradient-text">AI Assistant</span>
            </h2>
            <p className="text-text-light dark:text-foreground/70 max-w-2xl mx-auto mb-8">
              Get instant answers to your college admission queries with our AI-powered assistant
            </p>
          </div>
          <div className="max-w-3xl mx-auto glass-card p-6 rounded-2xl shadow-lg border border-primary/10 hover-lift">
            <AIRankAnalyzer />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-text dark:text-foreground mb-4">
            Why Choose <span className="gradient-text">College Sarthi</span>?
          </h2>
          <p className="text-text-light dark:text-foreground/70 text-center max-w-2xl mx-auto mb-12">
            We provide comprehensive guidance to help you make informed decisions about your academic future.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
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
      <section className="py-20 px-6 bg-white dark:bg-background/60 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-text dark:text-foreground mb-4">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-text-light dark:text-foreground/70 text-center max-w-2xl mx-auto mb-12">
            Hear from students who transformed their college admission journey with us
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Rahul Sharma"
              college="IIT Bombay"
              testimonial="College Sarthi's guidance was instrumental in helping me secure a seat at IIT Bombay. Their mentors provided invaluable insights!"
              imageSrc="/placeholder.svg"
            />
            <TestimonialCard 
              name="Priya Patel"
              college="NIT Trichy"
              testimonial="The AI rank analyzer gave me accurate predictions. I got admission to my dream college thanks to their personalized counseling."
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
