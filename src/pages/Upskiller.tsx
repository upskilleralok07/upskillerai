import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Sparkles, Brain, Code, Zap, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Expert";
  duration: string;
  icon: any;
  gradient: string;
  link?: string;
}

const aiCourses: Course[] = [
  {
    id: "algoforge",
    title: "AlgoForge - DSA Mastery",
    description: "Master DSA in 30 patterns with 400+ curated problems. Topic-wise & pattern-wise practice for coding interviews.",
    category: "Data Structures & Algorithms",
    difficulty: "Intermediate",
    duration: "12 weeks",
    icon: Code,
    gradient: "from-red-500 to-orange-500",
    link: "/dsa-patterns"
  },
  {
    id: "genai-llm",
    title: "Generative AI & LLMs",
    description: "Complete GenAI course: Python to production. Build RAG systems, AI agents, and deploy LLMs.",
    category: "Generative AI",
    difficulty: "Intermediate",
    duration: "16 weeks",
    icon: Sparkles,
    gradient: "from-purple-500 to-pink-500",
    link: "/genai-course"
  },
  {
    id: "1",
    title: "Introduction to Machine Learning",
    description: "Master the fundamentals of ML algorithms, supervised and unsupervised learning, and model evaluation.",
    category: "Machine Learning",
    difficulty: "Beginner",
    duration: "8 weeks",
    icon: Brain,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: "3",
    title: "Prompt Engineering Mastery",
    description: "Become an expert in crafting effective prompts for AI models. Optimize outputs and workflows.",
    category: "Prompt Engineering",
    difficulty: "Beginner",
    duration: "4 weeks",
    icon: Code,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "4",
    title: "AI for Developers",
    description: "Integrate AI APIs, build AI-powered applications, and deploy ML models in production.",
    category: "AI Integration",
    difficulty: "Intermediate",
    duration: "10 weeks",
    icon: Zap,
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: "5",
    title: "Deep Learning Fundamentals",
    description: "Neural networks, CNNs, RNNs, and transformers. Build advanced AI models from scratch.",
    category: "Deep Learning",
    difficulty: "Expert",
    duration: "12 weeks",
    icon: Brain,
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: "6",
    title: "AI Ethics & Responsible AI",
    description: "Understand bias, fairness, and ethical considerations in AI development and deployment.",
    category: "AI Ethics",
    difficulty: "Beginner",
    duration: "3 weeks",
    icon: Sparkles,
    gradient: "from-teal-500 to-blue-500"
  }
];

const categories = ["All", "Data Structures & Algorithms", "Generative AI", "Machine Learning", "Prompt Engineering", "AI Integration", "Deep Learning", "AI Ethics"];

const Upskiller = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");

  const filteredCourses = aiCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || course.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-purple-500/10 dark:from-background dark:via-primary/10 dark:to-purple-900/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 px-4 md:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm font-medium">AI-Powered Learning Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Upskill with <span className="gradient-text">AI Excellence</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Master cutting-edge AI technologies with structured courses designed by industry experts.
              From Machine Learning to Generative AI, start your AI journey today.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="pb-8 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="glass-card p-6 rounded-xl animate-slide-in">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>

              {/* Difficulty Filter */}
              <div className="flex gap-2 w-full lg:w-auto">
                <Button
                  variant={selectedDifficulty === "All" ? "default" : "outline"}
                  onClick={() => setSelectedDifficulty("All")}
                  size="sm"
                >
                  All Levels
                </Button>
                <Button
                  variant={selectedDifficulty === "Beginner" ? "default" : "outline"}
                  onClick={() => setSelectedDifficulty("Beginner")}
                  size="sm"
                >
                  Beginner
                </Button>
                <Button
                  variant={selectedDifficulty === "Intermediate" ? "default" : "outline"}
                  onClick={() => setSelectedDifficulty("Intermediate")}
                  size="sm"
                >
                  Intermediate
                </Button>
                <Button
                  variant={selectedDifficulty === "Expert" ? "default" : "outline"}
                  onClick={() => setSelectedDifficulty("Expert")}
                  size="sm"
                >
                  Expert
                </Button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover-scale px-4 py-2"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="pb-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => {
              const Icon = course.icon;
              return (
                <Card
                  key={course.id}
                  className="hover-lift overflow-hidden border-0 glass-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`h-2 bg-gradient-to-r ${course.gradient}`}></div>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${course.gradient} bg-opacity-10`}>
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {course.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <CardDescription className="text-sm">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">{course.duration}</span>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                    {course.link ? (
                      <Button asChild className="w-full group" size="lg">
                        <Link to={course.link}>
                          Start Course
                          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    ) : (
                      <Button className="w-full group" size="lg">
                        Coming Soon
                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 px-4 md:px-6 bg-gradient-to-r from-primary/10 to-purple-500/10">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            AI-Powered <span className="gradient-text">Learning Experience</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center glass-card p-8 rounded-xl hover-lift">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Recommendations</h3>
              <p className="text-muted-foreground">AI analyzes your progress and recommends personalized learning paths.</p>
            </div>
            <div className="text-center glass-card p-8 rounded-xl hover-lift">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Adaptive Learning</h3>
              <p className="text-muted-foreground">Content adapts to your pace and skill level for optimal learning.</p>
            </div>
            <div className="text-center glass-card p-8 rounded-xl hover-lift">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Feedback</h3>
              <p className="text-muted-foreground">Get instant AI-powered feedback on your code and projects.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Upskiller;
