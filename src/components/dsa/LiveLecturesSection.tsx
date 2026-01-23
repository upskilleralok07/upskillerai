import { useState } from 'react';
import { Play, Calendar, Clock, Users, Radio, ExternalLink, Youtube } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LiveLecture {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  scheduledAt?: string;
  isLive: boolean;
  duration?: string;
  viewers?: number;
  topic: string;
}

// Admin can add lectures here - this would typically come from a database
const liveLectures: LiveLecture[] = [
  {
    id: '1',
    title: 'Two Pointers Pattern Deep Dive',
    description: 'Master the two pointers technique with 10+ problem walkthrough',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual YouTube ID
    isLive: true,
    viewers: 234,
    topic: 'Two Pointers',
  },
  {
    id: '2',
    title: 'Dynamic Programming Fundamentals',
    description: 'Understanding memoization and tabulation from scratch',
    youtubeId: 'dQw4w9WgXcQ',
    scheduledAt: '2026-01-24T18:00:00',
    isLive: false,
    duration: '2 hours',
    topic: 'Dynamic Programming',
  },
  {
    id: '3',
    title: 'Graph Algorithms Masterclass',
    description: 'BFS, DFS, Dijkstra and more with real interview problems',
    youtubeId: 'dQw4w9WgXcQ',
    scheduledAt: '2026-01-25T17:00:00',
    isLive: false,
    duration: '2.5 hours',
    topic: 'Graphs',
  },
];

const pastLectures: LiveLecture[] = [
  {
    id: 'p1',
    title: 'Binary Search Patterns',
    description: 'All variations of binary search explained',
    youtubeId: 'dQw4w9WgXcQ',
    isLive: false,
    duration: '1.5 hours',
    topic: 'Binary Search',
  },
  {
    id: 'p2',
    title: 'Sliding Window Technique',
    description: 'Fixed and variable window problems',
    youtubeId: 'dQw4w9WgXcQ',
    isLive: false,
    duration: '1.5 hours',
    topic: 'Sliding Window',
  },
];

const LiveLecturesSection = () => {
  const [selectedLecture, setSelectedLecture] = useState<LiveLecture | null>(null);

  const formatScheduledTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const currentLive = liveLectures.find(l => l.isLive);
  const upcoming = liveLectures.filter(l => !l.isLive);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-red-500/20 text-red-500 border-red-500/30">
          <Radio className="w-3 h-3 mr-1 animate-pulse" /> Live Learning
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          AlgoForge <span className="gradient-text">Live Lectures</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join live coding sessions with expert instructors. Learn DSA concepts in real-time with interactive Q&A.
        </p>
      </div>

      {/* Live Now Section */}
      {currentLive && (
        <Card className="premium-card border-red-500/50 bg-gradient-to-r from-red-500/10 to-orange-500/10 overflow-hidden">
          <div className="absolute top-4 right-4">
            <Badge className="bg-red-500 text-white animate-pulse">
              <Radio className="w-3 h-3 mr-1" /> LIVE NOW
            </Badge>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Youtube className="w-6 h-6 text-red-500" />
              {currentLive.title}
            </CardTitle>
            <CardDescription>{currentLive.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <Badge variant="outline" className="border-primary/30">
                {currentLive.topic}
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                {currentLive.viewers} watching
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                className="bg-red-500 hover:bg-red-600 flex-1"
                onClick={() => window.open(`https://youtube.com/watch?v=${currentLive.youtubeId}`, '_blank')}
              >
                <Play className="w-4 h-4 mr-2" />
                Join Live Session
              </Button>
              <Button 
                variant="outline"
                onClick={() => setSelectedLecture(currentLive)}
              >
                Watch Here
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Embedded Player */}
      {selectedLecture && (
        <Card className="premium-card overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{selectedLecture.title}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedLecture(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedLecture.youtubeId}?autoplay=1`}
                title={selectedLecture.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Lectures */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Upcoming Sessions
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {upcoming.map((lecture) => (
            <Card key={lecture.id} className="premium-card red-border-glow hover-lift">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="border-primary/30 text-xs">
                    {lecture.topic}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {lecture.duration}
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-2">{lecture.title}</CardTitle>
                <CardDescription className="text-xs">{lecture.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {lecture.scheduledAt && formatScheduledTime(lecture.scheduledAt)}
                  </div>
                  <Button size="sm" variant="outline" className="text-primary border-primary/30">
                    Set Reminder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Past Recordings */}
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-primary" />
          Past Recordings
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {pastLectures.map((lecture) => (
            <Card 
              key={lecture.id} 
              className="premium-card hover-lift cursor-pointer group"
              onClick={() => setSelectedLecture(lecture)}
            >
              <CardContent className="p-4">
                <div className="aspect-video rounded-lg bg-muted mb-3 overflow-hidden relative">
                  <img 
                    src={`https://img.youtube.com/vi/${lecture.youtubeId}/mqdefault.jpg`}
                    alt={lecture.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-12 h-12 text-white" />
                  </div>
                </div>
                <Badge variant="outline" className="text-xs mb-2">{lecture.topic}</Badge>
                <h4 className="font-medium text-sm">{lecture.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{lecture.duration}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveLecturesSection;
