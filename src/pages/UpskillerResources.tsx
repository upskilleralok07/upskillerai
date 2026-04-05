
import Navbar from "@/components/Navbar";
import { BookOpen, Video, Code, Brain, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const resources = [
  { title: "DSA Patterns Practice", description: "400+ curated problems organized by 30 patterns for coding interview preparation.", icon: Code, link: "/dsa-patterns", internal: true },
  { title: "Generative AI & LLM Course", description: "Complete course from Python basics to building production-ready AI agents and RAG systems.", icon: Brain, link: "/genai-course", internal: true },
  { title: "Online College Dashboard", description: "Structured learning environment with focus timer, activity tracking, leaderboards, and streaks.", icon: BookOpen, link: "/online-college", internal: true },
  { title: "YouTube - Upskiller Channel", description: "Free video tutorials on AI, coding, career guidance, and engineering topics.", icon: Video, link: "https://youtube.com/@upskiller1", internal: false },
  { title: "College Review Playlist", description: "In-depth reviews of top engineering colleges with placement data and campus insights.", icon: Video, link: "https://www.youtube.com/playlist?list=PLi02G-3chf-D4ezS1JDiLRrMRmf1V92iW", internal: false },
];

const UpskillerResources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            <span className="gradient-text">Upskiller</span> Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free learning resources, courses, playlists, and tools to accelerate your career growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((r, i) => {
            const Icon = r.icon;
            return (
              <Card key={i} className="hover-lift transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{r.title}</CardTitle>
                  <CardDescription>{r.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {r.internal ? (
                    <Button asChild className="w-full">
                      <Link to={r.link}>Open Resource</Link>
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={r.link} target="_blank" rel="noopener noreferrer">
                        Visit <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UpskillerResources;
