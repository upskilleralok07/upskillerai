import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, CheckCircle2, Circle, ExternalLink, Lock, Clock, Target, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navbar from '@/components/Navbar';
import VideoPlayer from '@/components/VideoPlayer';

const patternData = {
  'sliding-window': {
    name: 'Sliding Window',
    icon: '🪟',
    color: 'from-blue-500 to-cyan-500',
    difficulty: 'Beginner',
    estimatedTime: '6-8 hours',
    videoId: 'jM2dhDPYMQM',
    description: 'The Sliding Window pattern is used to perform operations on a specific window size of an array or string. It\'s particularly useful for problems that require finding contiguous subarrays or substrings that satisfy certain conditions.',
    whenToUse: [
      'Finding maximum/minimum sum of subarray of size K',
      'Longest substring with K distinct characters',
      'String anagrams and permutations',
      'Maximum/minimum of all subarrays of size K'
    ],
    template: `def sliding_window(arr, k):
    window_sum = sum(arr[:k])  # Initial window
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        # Slide the window
        window_sum = window_sum - arr[i-k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum`,
    problems: {
      easy: [
        { id: 1, title: 'Maximum Average Subarray', leetcode: 643, link: 'https://leetcode.com/problems/maximum-average-subarray-i/', solved: false, attempted: false },
        { id: 2, title: 'Contains Duplicate II', leetcode: 219, link: 'https://leetcode.com/problems/contains-duplicate-ii/', solved: false, attempted: false },
        { id: 3, title: 'Maximum Number of Vowels in Substring', leetcode: 1456, link: 'https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/', solved: false, attempted: false },
        { id: 4, title: 'Repeated Substring Pattern', leetcode: 459, link: 'https://leetcode.com/problems/repeated-substring-pattern/', solved: false, attempted: false },
        { id: 5, title: 'Minimum Difference Between Highest and Lowest of K Scores', leetcode: 1984, link: 'https://leetcode.com/problems/minimum-difference-between-highest-and-lowest-of-k-scores/', solved: false, attempted: false }
      ],
      medium: [
        { id: 6, title: 'Longest Substring Without Repeating Characters', leetcode: 3, link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', solved: false, attempted: false },
        { id: 7, title: 'Longest Repeating Character Replacement', leetcode: 424, link: 'https://leetcode.com/problems/longest-repeating-character-replacement/', solved: false, attempted: false },
        { id: 8, title: 'Permutation in String', leetcode: 567, link: 'https://leetcode.com/problems/permutation-in-string/', solved: false, attempted: false },
        { id: 9, title: 'Fruit Into Baskets', leetcode: 904, link: 'https://leetcode.com/problems/fruit-into-baskets/', solved: false, attempted: false },
        { id: 10, title: 'Max Consecutive Ones III', leetcode: 1004, link: 'https://leetcode.com/problems/max-consecutive-ones-iii/', solved: false, attempted: false },
        { id: 11, title: 'Longest Subarray of 1s After Deleting One Element', leetcode: 1493, link: 'https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/', solved: false, attempted: false },
        { id: 12, title: 'Grumpy Bookstore Owner', leetcode: 1052, link: 'https://leetcode.com/problems/grumpy-bookstore-owner/', solved: false, attempted: false }
      ],
      hard: [
        { id: 13, title: 'Minimum Window Substring', leetcode: 76, link: 'https://leetcode.com/problems/minimum-window-substring/', solved: false, attempted: false },
        { id: 14, title: 'Sliding Window Maximum', leetcode: 239, link: 'https://leetcode.com/problems/sliding-window-maximum/', solved: false, attempted: false },
        { id: 15, title: 'Substring with Concatenation of All Words', leetcode: 30, link: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/', solved: false, attempted: false }
      ]
    },
    commonMistakes: [
      {
        title: 'Not maintaining window constraints',
        why: 'Forgetting to check if the window satisfies required conditions leads to incorrect results.',
        fix: 'Always validate window conditions before updating the result.',
        code: `# Wrong: Not checking validity
result = max(result, window_size)

# Correct: Check validity first
if is_valid(window):
    result = max(result, window_size)`
      },
      {
        title: 'Incorrect window shrinking logic',
        why: 'Not properly shrinking the window when conditions are violated.',
        fix: 'Use a while loop to shrink until the window is valid again.',
        code: `# Correct shrinking logic
while not is_valid(window):
    # Remove left element
    left += 1`
      }
    ]
  }
  // Add other patterns similarly...
};

const PatternDetail = () => {
  const { patternId } = useParams();
  const pattern = patternData[patternId as keyof typeof patternData];
  const [activeTab, setActiveTab] = useState('overview');

  if (!pattern) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Pattern Not Found</h1>
          <Link to="/dsa-patterns">
            <Button>Back to Patterns</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalProblems = pattern.problems.easy.length + pattern.problems.medium.length + pattern.problems.hard.length;
  const solvedProblems = 0; // This would come from your database
  const progress = Math.round((solvedProblems / totalProblems) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      <Navbar />
      
      <div className="pt-24 md:pt-32 pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <Link to="/dsa-patterns" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to All Patterns
          </Link>

          {/* Pattern Header */}
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${pattern.color} flex items-center justify-center text-4xl flex-shrink-0`}>
                {pattern.icon}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  {pattern.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <Badge variant="secondary">{pattern.difficulty}</Badge>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {pattern.estimatedTime}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Target className="w-4 h-4" />
                    {totalProblems} problems
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Your Progress</span>
                    <span className="text-sm font-medium text-foreground">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
              <TabsTrigger value="discuss">Discuss</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Video Lesson */}
              <Card className="glass-card border-primary/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Core Concept Lesson
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <VideoPlayer videoId={pattern.videoId} title={`${pattern.name} Tutorial`} />
                </CardContent>
              </Card>

              {/* What is this pattern */}
              <Card className="glass-card border-primary/10">
                <CardHeader>
                  <CardTitle>What is {pattern.name}?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{pattern.description}</p>
                </CardContent>
              </Card>

              {/* When to use */}
              <Card className="glass-card border-primary/10">
                <CardHeader>
                  <CardTitle>When to Use This Pattern?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pattern.whenToUse.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Code Template */}
              <Card className="glass-card border-primary/10">
                <CardHeader>
                  <CardTitle>Pattern Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-muted/50 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-foreground">{pattern.template}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="problems" className="space-y-6">
              <Card className="glass-card border-primary/10">
                <CardHeader>
                  <CardTitle>Problem Set - {totalProblems} Problems</CardTitle>
                  <CardDescription>Practice problems organized by difficulty</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="easy">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="easy">Easy ({pattern.problems.easy.length})</TabsTrigger>
                      <TabsTrigger value="medium">Medium ({pattern.problems.medium.length})</TabsTrigger>
                      <TabsTrigger value="hard">Hard ({pattern.problems.hard.length})</TabsTrigger>
                    </TabsList>

                    {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
                      <TabsContent key={difficulty} value={difficulty} className="space-y-3 mt-4">
                        {pattern.problems[difficulty].map((problem) => (
                          <div key={problem.id} className="glass-card p-4 rounded-lg flex items-center gap-4">
                            <div className="flex-shrink-0">
                              {problem.solved ? (
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                              ) : problem.attempted ? (
                                <Circle className="w-6 h-6 text-yellow-500" />
                              ) : (
                                <Circle className="w-6 h-6 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm text-muted-foreground">#{problem.leetcode}</span>
                                <h4 className="font-medium text-foreground">{problem.title}</h4>
                              </div>
                              <Badge variant="outline" className="text-xs capitalize">
                                {difficulty}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button asChild size="sm" variant="outline">
                                <a href={problem.link} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-4 h-4 mr-1" />
                                  Solve
                                </a>
                              </Button>
                              <Button size="sm" variant="ghost" disabled>
                                <Lock className="w-4 h-4 mr-1" />
                                Solution
                              </Button>
                            </div>
                          </div>
                        ))}
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mistakes">
              <Card className="glass-card border-primary/10">
                <CardHeader>
                  <CardTitle>Common Mistakes</CardTitle>
                  <CardDescription>Learn from common pitfalls and how to avoid them</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-3">
                    {pattern.commonMistakes.map((mistake, idx) => (
                      <AccordionItem key={idx} value={`mistake-${idx}`} className="glass-card rounded-lg border-primary/10">
                        <AccordionTrigger className="px-4 hover:no-underline">
                          <span className="font-medium text-foreground">{mistake.title}</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 space-y-3">
                          <div>
                            <h5 className="text-sm font-medium text-foreground mb-1">Why it's wrong:</h5>
                            <p className="text-sm text-muted-foreground">{mistake.why}</p>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-foreground mb-1">How to fix:</h5>
                            <p className="text-sm text-muted-foreground mb-2">{mistake.fix}</p>
                            <pre className="bg-muted/50 p-3 rounded text-xs overflow-x-auto">
                              <code className="text-foreground">{mistake.code}</code>
                            </pre>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discuss">
              <Card className="glass-card border-primary/10">
                <CardHeader>
                  <CardTitle>Discussion Forum</CardTitle>
                  <CardDescription>Ask questions and share insights with the community</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <Award className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Discussion forum coming soon!</p>
                  <Button variant="outline">Join Waitlist</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatternDetail;
