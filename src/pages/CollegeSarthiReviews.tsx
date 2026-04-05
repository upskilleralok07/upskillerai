
import { Play, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VideoResource {
  title: string;
  videoUrl: string;
  videoId: string;
  description: string;
}

const videos: VideoResource[] = [
  {
    title: "SGSITS Indore College Review | Placement, Cutoff, Fees Structure",
    videoUrl: "https://www.youtube.com/watch?v=aRyDluoQljA",
    videoId: "aRyDluoQljA",
    description: "Complete SGSITS Indore review covering placements, cutoff trends, fees structure, campus overview, and admission insights for MP DTE counselling aspirants.",
  },
  {
    title: "JEC Jabalpur College Review 2025 | Deep Dive",
    videoUrl: "https://www.youtube.com/watch?v=uYEy1b13Hqg",
    videoId: "uYEy1b13Hqg",
    description: "Detailed JEC Jabalpur review including placements, fee structure, campus life, branches, and important points for engineering aspirants.",
  },
  {
    title: "IET DAVV Indore College Review 2025",
    videoUrl: "https://www.youtube.com/watch?v=qbuaVmK0W-o",
    videoId: "qbuaVmK0W-o",
    description: "IET DAVV Indore review focused on campus, courses, placements, and admission guidance for MP engineering students.",
  },
  {
    title: "Not Getting On-Campus Placement? Step-by-Step Roadmap",
    videoUrl: "https://www.youtube.com/watch?v=LfSDZKrLbgE",
    videoId: "LfSDZKrLbgE",
    description: "Step-by-step roadmap to crack on-campus placements with practical tips, strategies, and preparation plans.",
  },
  {
    title: "MITS Gwalior College Review 2025 | College Sarthi",
    videoUrl: "https://www.youtube.com/watch?v=GF8Y5Ujyl8w",
    videoId: "GF8Y5Ujyl8w",
    description: "In-depth MITS Gwalior review covering placements, fees, campus life, branches, and pros-cons.",
  },
  {
    title: "1st Year College Roadmap | Complete College Guide",
    videoUrl: "https://www.youtube.com/watch?v=4RsSWeHlOd0",
    videoId: "4RsSWeHlOd0",
    description: "Complete first-year college roadmap including mindset, skills, academics, projects, internships, and personal growth.",
  },
  {
    title: "How to Choose Best Engineering College for You",
    videoUrl: "https://www.youtube.com/watch?v=iqPVkFz9zW8",
    videoId: "iqPVkFz9zW8",
    description: "Guide on choosing the best engineering college based on branch, location, fees, placements, and long-term career goals.",
  },
  {
    title: "Top 10 Engineering Colleges in India (Other than IITs)",
    videoUrl: "https://www.youtube.com/watch?v=StmeMQEIbUI",
    videoId: "StmeMQEIbUI",
    description: "Top 10 engineering colleges apart from IITs, focusing on brand value, placements, campus life, and opportunities.",
  },
  {
    title: "These Items Changed My Entire College Life",
    videoUrl: "https://www.youtube.com/watch?v=XPv4eUkASoE",
    videoId: "XPv4eUkASoE",
    description: "Must-have college items and gadgets that improve productivity, comfort, and overall college life.",
  },
  {
    title: "Is MERN Stack Dead in 2025?",
    videoUrl: "https://www.youtube.com/watch?v=jwq6WlLnNJQ",
    videoId: "jwq6WlLnNJQ",
    description: "Discussion on whether MERN stack is still relevant in 2025, its market demand, alternatives, and what developers should focus on.",
  },
  {
    title: "Full Breakdown: VIT Bhopal Student Protests (Jaundice Outbreak Allegations)",
    videoUrl: "https://www.youtube.com/watch?v=Bk_CWreoS3I",
    videoId: "Bk_CWreoS3I",
    description: "Breakdown of VIT Bhopal student protests, jaundice outbreak allegations, and key points for students and parents evaluating the college.",
  },
];

const CollegeSarthiReviews = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            College Reviews & <span className="gradient-text">Video Resources</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch in-depth college reviews, placement analysis, and career guidance videos from the College Sarthi playlist.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <Card key={i} className="overflow-hidden hover-lift transition-all duration-300 border-border/50">
              <div className="relative aspect-video bg-muted">
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                >
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </a>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base leading-snug line-clamp-2">{video.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm line-clamp-3 mb-4">{video.description}</CardDescription>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                    Watch on YouTube <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollegeSarthiReviews;
