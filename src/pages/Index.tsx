
import { ArrowRight, GraduationCap, Rocket, BookOpen, Users, Brain, Code, Star, Sparkles, Target, Video, MessageSquare } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Split Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6">
        <div className="container mx-auto text-center mb-12 md:mb-16 animate-fade-in">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            One Platform. <span className="gradient-text">Two Powerful Ecosystems.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you need college counselling or want to upskill with AI-powered courses — we've got you covered.
          </p>
        </div>

        <div className="container mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          {/* College Sarthi Card */}
          <div className="group relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-primary/10 p-8 md:p-10 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 animate-fade-in">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500 rounded-t-2xl" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">College Sarthi</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-base md:text-lg leading-relaxed">
              Expert guidance for college admissions, counselling, branch selection, and career planning. Get personalized mentorship from IIT/NIT alumni.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Target, label: "College Selection" },
                { icon: Users, label: "Expert Mentorship" },
                { icon: Video, label: "College Reviews" },
                { icon: MessageSquare, label: "MP DTE Counselling" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <Button size="lg" className="w-full group/btn" asChild>
              <Link to="/college-sarthi/services">
                Explore College Sarthi
                <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Upskiller Card */}
          <div className="group relative rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 via-background to-purple-500/10 p-8 md:p-10 hover:border-purple-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 animate-fade-in" style={{ animationDelay: "0.15s" }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                <Rocket className="w-7 h-7 text-purple-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Upskiller</h2>
            </div>
            <p className="text-muted-foreground mb-6 text-base md:text-lg leading-relaxed">
              Master cutting-edge skills with AI-powered courses, structured learning paths, DSA mastery, and placement-focused training.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: Brain, label: "GenAI & LLM Course" },
                { icon: Code, label: "DSA Mastery" },
                { icon: Sparkles, label: "AI-Powered Learning" },
                { icon: BookOpen, label: "Online College" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                  <item.icon className="w-4 h-4 text-purple-500" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700 text-white group/btn" asChild>
              <Link to="/upskiller/courses">
                Explore Upskiller
                <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { value: "500+", label: "Students in IITs" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "5000+", label: "Mentorship Hours" },
              { value: "10+", label: "AI Courses" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 rounded-xl text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-center text-foreground mb-3">
            What Our <span className="gradient-text">Students Say</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Hear from students who transformed their journey with us
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Rahul Sharma", college: "IIT Bombay", text: "College Sarthi's guidance was instrumental in helping me secure a seat at IIT Bombay." },
              { name: "Priya Patel", college: "NIT Trichy", text: "The rank analyzer gave me accurate predictions. Got admission to my dream college!" },
              { name: "Aman Gupta", college: "IIIT Hyderabad", text: "Upskiller's GenAI course helped me land an AI internship at a top startup." },
            ].map((t, i) => (
              <div key={i} className="glass-card p-6 rounded-xl">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/90 text-sm mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.college}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
