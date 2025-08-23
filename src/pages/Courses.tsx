import { useState } from 'react';
import { ChevronDown, Play, Award, Users, Star, BookOpen, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoPlayer from '@/components/VideoPlayer';
import Navbar from '@/components/Navbar';

const courses = [
  {
    id: 'math1',
    title: 'Engineering Mathematics I',
    description: 'Learn differential calculus, matrices, and vector algebra with applications in engineering. Build strong foundation in calculus and apply mathematical concepts to engineering problems.',
    chapters: [
      { title: 'Differential Calculus', videoId: 'p1nt9dFQ5B4', duration: '45 min' },
      { title: 'Matrices and Determinants', videoId: 'sYlOjyPyX3g', duration: '52 min' },
      { title: 'Vector Algebra', videoId: 'ml4NSzCQobk', duration: '38 min' },
      { title: 'Applications in Engineering', videoId: 'WUvTyaaNkzM', duration: '41 min' }
    ],
    playlist: 'https://www.youtube.com/playlist?list=PLm_MSClsnwm9_fzGpwud8SAG1tn9UTPCF',
    outcomes: [
      'Build strong foundation in calculus',
      'Apply mathematical concepts to engineering problems', 
      'Prepare for competitive exams',
      'Solve complex engineering mathematics problems'
    ]
  },
  {
    id: 'electrical',
    title: 'Basic Electrical Engineering',
    description: 'Understand DC/AC circuits, transformers, and machine operations. Learn fundamental electrical concepts essential for all engineering branches.',
    chapters: [
      { title: 'DC Circuits Analysis', videoId: 'MC50DuU0vsI', duration: '48 min' },
      { title: 'AC Circuit Fundamentals', videoId: 'yF6pRWr6B9k', duration: '55 min' },
      { title: 'Transformers', videoId: 'HyKVsbJwkBQ', duration: '42 min' },
      { title: 'Electrical Machines', videoId: 'QX3SiQt5NdU', duration: '50 min' }
    ],
    playlist: 'https://www.youtube.com/playlist?list=PL4K9r9dYCOors6MRFwoIe9_iBzSzUp2Zi',
    outcomes: [
      'Understand DC and AC circuit analysis',
      'Learn transformer working principles',
      'Master electrical machine operations',
      'Apply electrical concepts in engineering'
    ]
  },
  {
    id: 'math2',
    title: 'Engineering Mathematics II', 
    description: 'Advanced topics including Fourier series, Laplace transforms, and complex analysis. Essential mathematical tools for higher engineering studies.',
    chapters: [
      { title: 'Fourier Series', videoId: 'r18h66OpCYw', duration: '46 min' },
      { title: 'Laplace Transforms', videoId: 'n2y7n6jw5d0', duration: '51 min' },
      { title: 'Complex Analysis', videoId: 'sp-YSzf8JXE', duration: '44 min' },
      { title: 'Partial Differential Equations', videoId: 'Hyj1SC_TCa4', duration: '49 min' }
    ],
    playlist: 'https://www.youtube.com/playlist?list=PLm_MSClsnwm8YoxXANVTIgZCbFfDuLndT',
    outcomes: [
      'Master Fourier series and transforms',
      'Apply Laplace transforms to engineering problems', 
      'Understand complex analysis concepts',
      'Solve advanced mathematical problems'
    ]
  },
  {
    id: 'physics',
    title: 'Engineering Physics',
    description: 'Fundamental physics concepts including mechanics, waves, optics, and modern physics applications in engineering.',
    chapters: [
      { title: 'Mechanics and Properties of Matter', videoId: 'QX3SiQt5NdU', duration: '47 min' },
      { title: 'Wave Motion and Sound', videoId: 'r18h66OpCYw', duration: '43 min' },
      { title: 'Optics and Lasers', videoId: 'n2y7n6jw5d0', duration: '39 min' },
      { title: 'Modern Physics', videoId: 'sp-YSzf8JXE', duration: '52 min' }
    ],
    playlist: 'https://www.youtube.com/playlist?list=PLwjK_iyK4LLBC-La7tWm-Ll_d2_w-XTRZ',
    outcomes: [
      'Understand fundamental physics principles',
      'Apply physics in engineering applications',
      'Learn modern physics concepts',
      'Develop analytical problem-solving skills'
    ]
  },
  {
    id: 'chemistry',
    title: 'Engineering Chemistry',
    description: 'Chemical principles for engineers including atomic structure, chemical bonding, and materials chemistry.',
    chapters: [
      { title: 'Atomic Structure & Chemical Bonding', videoId: 'MC50DuU0vsI', duration: '44 min' },
      { title: 'Thermodynamics & Electrochemistry', videoId: 'yF6pRWr6B9k', duration: '47 min' },
      { title: 'Materials Chemistry', videoId: 'HyKVsbJwkBQ', duration: '41 min' },
      { title: 'Environmental Chemistry', videoId: 'Hyj1SC_TCa4', duration: '38 min' }
    ],
    playlist: 'https://www.youtube.com/playlist?list=PLwjK_iyK4LLCf9WOdqXQ7yOjMR9iGmMpa',
    outcomes: [
      'Master fundamental chemistry concepts',
      'Understand materials and their properties',
      'Learn electrochemical processes',
      'Apply chemistry in engineering contexts'
    ]
  },
  {
    id: 'electronics',
    title: 'Basic Electronics Engineering',
    description: 'Introduction to electronic devices, circuits, and digital systems fundamental to modern engineering.',
    chapters: [
      { title: 'Semiconductor Devices', videoId: 'p1nt9dFQ5B4', duration: '45 min' },
      { title: 'Amplifiers and Oscillators', videoId: 'sYlOjyPyX3g', duration: '48 min' },
      { title: 'Digital Electronics', videoId: 'ml4NSzCQobk', duration: '42 min' },
      { title: 'Communication Systems', videoId: 'WUvTyaaNkzM', duration: '46 min' }
    ],
    playlist: 'https://www.youtube.com/playlist?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm',
    outcomes: [
      'Understand semiconductor device operation',
      'Design basic electronic circuits', 
      'Learn digital logic fundamentals',
      'Explore communication system basics'
    ]
  }
];

const recruiters = [
  { name: 'Microsoft', logo: '🚀' },
  { name: 'Google', logo: '🌟' },
  { name: 'Amazon', logo: '📦' },
  { name: 'TCS', logo: '💼' },
  { name: 'Infosys', logo: '🔥' },
  { name: 'Wipro', logo: '⚡' }
];

const testimonials = [
  {
    name: 'Arjun Kumar',
    rating: 5,
    text: 'These courses helped me build a strong foundation in my first year. The structured approach made complex topics easy to understand.'
  },
  {
    name: 'Sneha Patel',
    rating: 5,
    text: 'Excellent content quality and perfect for exam preparation. I scored 9.2 GPA in my first year using these resources.'
  },
  {
    name: 'Rohit Singh',
    rating: 5,
    text: 'The YouTube lectures are carefully curated and cover all important topics. Highly recommend for all engineering students.'
  }
];

const faqs = [
  {
    question: 'Are these courses suitable for all engineering branches?',
    answer: 'Yes, these are common subjects taught across all engineering branches including CSE, ECE, Mechanical, Civil, Electrical, and IT.'
  },
  {
    question: 'How should I prepare for first year exams?',
    answer: 'Follow our structured course content, watch the recommended videos, practice problems regularly, and focus on understanding concepts rather than memorization.'
  },
  {
    question: 'What career options are available after first year?',
    answer: 'You can choose your specialization, prepare for competitive exams, focus on skill development, or explore internship opportunities in your chosen field.'
  },
  {
    question: 'Are the YouTube lectures free to access?',
    answer: 'Yes, all the recommended YouTube lectures are completely free. We have curated the best content from top educational channels.'
  }
];

const Courses = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-primary/5 dark:from-background dark:via-background/80 dark:to-primary/10">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            1st Year Engineering <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Learn all your 1st year subjects with curated resources and top YouTube lectures. 
            Master the fundamentals that will shape your entire engineering journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Learning Now
            </Button>
            <Button variant="outline" size="lg">
              Download Syllabus
            </Button>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="pb-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Accordion type="multiple" className="space-y-4">
              {courses.map((course) => (
                <AccordionItem 
                  key={course.id} 
                  value={course.id}
                  className="glass-card rounded-2xl border border-primary/10 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-primary/5 transition-colors">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Play className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.description}</p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <Tabs defaultValue="chapters" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="chapters" className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          Chapters
                        </TabsTrigger>
                        <TabsTrigger value="outcomes" className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Outcomes
                        </TabsTrigger>
                        <TabsTrigger value="playlist" className="flex items-center gap-2">
                          <Play className="w-4 h-4" />
                          Full Course
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="chapters" className="space-y-4">
                        <h4 className="font-semibold text-foreground mb-3">📚 Chapter-wise Learning</h4>
                        <div className="grid gap-4">
                          {course.chapters.map((chapter, index) => (
                            <div key={index} className="glass-card p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-3">
                                <h5 className="font-medium text-foreground">{chapter.title}</h5>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  {chapter.duration}
                                </div>
                              </div>
                              <VideoPlayer 
                                videoId={chapter.videoId}
                                title={`${course.title} - ${chapter.title}`}
                                className="w-full"
                              />
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="outcomes" className="space-y-4">
                        <h4 className="font-semibold text-foreground mb-3">🎯 Key Learning Outcomes</h4>
                        <ul className="space-y-3">
                          {course.outcomes.map((outcome, index) => (
                            <li key={index} className="flex items-start gap-3 text-sm">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>

                      <TabsContent value="playlist" className="space-y-4">
                        <h4 className="font-semibold text-foreground mb-3">📹 Complete Course Playlist</h4>
                        <div className="glass-card p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-3">
                            Access the complete course playlist from Ekeeda with all chapters and additional content.
                          </p>
                          <Button asChild className="w-full">
                            <a href={course.playlist} target="_blank" rel="noopener noreferrer">
                              <Play className="w-4 h-4 mr-2" />
                              Open Full Playlist
                            </a>
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Top Recruiters Section */}
      <section className="py-12 px-4 md:px-6 bg-white/50 dark:bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Top Companies Hiring <span className="gradient-text">Engineering Graduates</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {recruiters.map((recruiter, index) => (
              <div key={index} className="glass-card p-4 rounded-xl text-center hover-lift">
                <div className="text-3xl mb-2">{recruiter.logo}</div>
                <p className="text-sm font-medium text-foreground">{recruiter.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Reviews */}
      <section className="py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            What <span className="gradient-text">Students Say</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card border-primary/10">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 md:px-6 bg-white/50 dark:bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-8">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="glass-card rounded-xl border border-primary/10"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-primary/5 transition-colors">
                    <span className="font-medium text-foreground">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto glass-card p-8 rounded-2xl">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Start Your Journey Towards a <span className="gradient-text">Dream College</span> Today!
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of students who have transformed their academic journey with our curated courses and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Start Learning Now
              </Button>
              <Button variant="outline" size="lg">
                Get Free Counseling
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;