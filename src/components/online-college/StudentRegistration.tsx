import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Target, Sparkles } from "lucide-react";

interface StudentRegistrationProps {
  onComplete: () => void;
}

const roadmaps = [
  { type: "ace_semester_exams", title: "Ace Semester Exams", icon: "📚", description: "Master your exams" },
  { type: "master_python", title: "Master Python", icon: "🐍", description: "Become a Python expert" },
  { type: "crack_placements", title: "Crack Campus Placements", icon: "💼", description: "Land your dream job" },
  { type: "web_development", title: "Web Development", icon: "🌐", description: "Build modern websites" },
  { type: "data_science", title: "Data Science", icon: "📊", description: "Master data & AI" },
  { type: "competitive_programming", title: "Competitive Programming", icon: "⚡", description: "Ace coding contests" },
];

const StudentRegistration = ({ onComplete }: StudentRegistrationProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    campus: "",
    grade_semester: "",
    interests: "",
    selected_roadmap: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("students").insert({
        user_id: user?.id,
        name: formData.name,
        campus: formData.campus,
        grade_semester: formData.grade_semester,
        interests: formData.interests.split(",").map(i => i.trim()),
        selected_roadmap: formData.selected_roadmap as any,
      } as any);

      if (error) throw error;

      toast({
        title: "Welcome to Online College! 🎉",
        description: "Your profile has been created successfully.",
      });
      onComplete();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-12 max-w-4xl">
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join <span className="gradient-text">Online College</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Create your profile to start learning with peers from your campus
        </p>
      </div>

      <Card className="p-6 md:p-8 glass-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="campus">College/Campus *</Label>
            <Input
              id="campus"
              required
              value={formData.campus}
              onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
              placeholder="e.g., IIT Delhi, MIT, Stanford"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade">Grade/Semester *</Label>
            <Input
              id="grade"
              required
              value={formData.grade_semester}
              onChange={(e) => setFormData({ ...formData, grade_semester: e.target.value })}
              placeholder="e.g., 3rd Semester, Final Year"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="interests">Interests (comma-separated)</Label>
            <Input
              id="interests"
              value={formData.interests}
              onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
              placeholder="e.g., Machine Learning, Web Dev, Data Science"
            />
          </div>

          <div className="space-y-4">
            <Label className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Select Your Learning Roadmap *
            </Label>
            <div className="grid md:grid-cols-2 gap-4">
              {roadmaps.map((roadmap) => (
                <Card
                  key={roadmap.type}
                  className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                    formData.selected_roadmap === roadmap.type
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setFormData({ ...formData, selected_roadmap: roadmap.type })}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{roadmap.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{roadmap.title}</h3>
                      <p className="text-xs text-muted-foreground">{roadmap.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            disabled={loading || !formData.selected_roadmap}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {loading ? "Creating Profile..." : "Start Your Journey"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default StudentRegistration;