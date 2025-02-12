
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="aspect-video w-full mb-8">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/kdPIQCKMjE8?autoplay=1"
                title="Welcome Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text mb-6 animate-slide-in">
              Find Your Best College Match with Expert Guidance!
            </h1>
            <p className="text-xl text-text-light mb-8 animate-slide-in" style={{ animationDelay: "0.2s" }}>
              Get personalized recommendations and mentorship to secure your dream college admission.
            </p>
            <button className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 animate-slide-in" style={{ animationDelay: "0.4s" }}>
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4">
            Why Choose College Sarthi?
          </h2>
          <p className="text-text-light text-center max-w-2xl mx-auto mb-12">
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
    </div>
  );
};

export default Index;
