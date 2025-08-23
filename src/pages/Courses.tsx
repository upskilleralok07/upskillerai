import { useState } from 'react';
import { ChevronDown, Play, Award, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navbar from '@/components/Navbar';

const courses = [
  {
    id: 'math1',
    title: 'Engineering Mathematics I',
    description: 'Learn differential calculus, matrices, and vector algebra with applications in engineering problems.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLu1Yq1JSuXSuMF5n4qwNJNlYBTNJIK6eU',
    videoTitle: 'Engineering Mathematics 1 Full Course - NPTEL',
    keyOutcomes: [
      'Build strong foundation in calculus',
      'Apply mathematical concepts to engineering problems', 
      'Prepare for competitive exams',
      'Master matrix operations and vector algebra'
    ]
  },
  {
    id: 'math2',
    title: 'Engineering Mathematics II',
    description: 'Advanced topics including differential equations, Fourier series, and complex analysis for engineering applications.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLbMVogVj5nJSez6CQk6wWrcr7sWhi2u8k',
    videoTitle: 'Engineering Mathematics 2 Complete Course',
    keyOutcomes: [
      'Solve complex differential equations',
      'Understand Fourier analysis',
      'Apply transform methods',
      'Handle engineering mathematical modeling'
    ]
  },
  {
    id: 'physics',
    title: 'Engineering Physics',
    description: 'Fundamental physics concepts including mechanics, thermodynamics, waves, and modern physics for engineers.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLQms29D1RqeJSjZhIInvd-8bWkLsHtSIZ',
    videoTitle: 'Engineering Physics Complete Course - NPTEL',
    keyOutcomes: [
      'Master fundamental physics principles',
      'Understand wave mechanics and optics',
      'Apply physics in engineering contexts',
      'Explore modern physics concepts'
    ]
  },
  {
    id: 'chemistry',
    title: 'Engineering Chemistry',
    description: 'Chemical principles, organic chemistry basics, materials science, and environmental chemistry for engineers.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLqOZ6FD_RQ7n8WvVaF-wL_RR5U8s5Q7i1',
    videoTitle: 'Engineering Chemistry Full Course',
    keyOutcomes: [
      'Understand chemical bonding and reactions',
      'Learn about engineering materials',
      'Study corrosion and its prevention',
      'Explore green chemistry principles'
    ]
  },
  {
    id: 'electrical',
    title: 'Basic Electrical Engineering',
    description: 'DC/AC circuits, network theorems, electrical machines, and power systems fundamentals.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLmXKhU9FNesSfX1PVt4VGm-wbNKjFQaLl',
    videoTitle: 'Basic Electrical Engineering - NPTEL',
    keyOutcomes: [
      'Analyze DC and AC circuits',
      'Understand electrical machines',
      'Apply network theorems',
      'Learn power system basics'
    ]
  },
  {
    id: 'electronics',
    title: 'Basic Electronics Engineering',
    description: 'Semiconductor devices, amplifiers, digital electronics, and communication systems fundamentals.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLBlnK6fEyqRjMH3mWf6kwqiTbT798eAOm',
    videoTitle: 'Basic Electronics Engineering Complete Course',
    keyOutcomes: [
      'Master semiconductor physics',
      'Design basic amplifier circuits',
      'Understand digital logic gates',
      'Learn communication principles'
    ]
  },
  {
    id: 'mechanics',
    title: 'Engineering Mechanics',
    description: 'Statics, dynamics, force systems, friction, and mechanical principles for engineering applications.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLuUdFsbOK_8oHLcbx0QWe9doD7iueGp2p',
    videoTitle: 'Engineering Mechanics Complete Course',
    keyOutcomes: [
      'Analyze force systems and equilibrium',
      'Solve dynamics problems',
      'Understand friction and its applications',
      'Apply mechanics in engineering design'
    ]
  },
  {
    id: 'graphics',
    title: 'Engineering Graphics & Drawing',
    description: 'Technical drawing, orthographic projections, isometric views, and CAD fundamentals.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLQms29D1RqeJQSjZhIInvd-8bWkLsHtSIZ',
    videoTitle: 'Engineering Drawing Complete Course - NPTEL',
    keyOutcomes: [
      'Master technical drawing standards',
      'Create orthographic projections',
      'Design isometric and sectional views',
      'Learn CAD software basics'
    ]
  },
  {
    id: 'programming',
    title: 'Programming in C / Problem Solving',
    description: 'C programming fundamentals, data structures, algorithms, and problem-solving techniques.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLdo5W4Nhv31a8UcMN9-35ghv8qyFWD9_S',
    videoTitle: 'C Programming Full Course - Jenny\'s Lectures',
    keyOutcomes: [
      'Master C programming syntax',
      'Implement data structures',
      'Develop algorithmic thinking',
      'Solve complex programming problems'
    ]
  },
  {
    id: 'environmental',
    title: 'Environmental Studies',
    description: 'Environmental science, ecology, pollution control, and sustainable development principles.',
    videoUrl: 'https://www.youtube.com/embed/videoseries?list=PLLy_2iUCG87B7jqnONq2DEouOsDaCSNV_',
    videoTitle: 'Environmental Studies Complete Course',
    keyOutcomes: [
      'Understand ecosystem dynamics',
      'Learn pollution prevention methods',
      'Study sustainable development',
      'Analyze environmental impact'
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
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Video Section */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">📹 Recommended Video Course</h4>
                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted mb-3">
                          <iframe
                            width="100%"
                            height="100%"
                            src={course.videoUrl}
                            title={course.videoTitle}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg"
                          ></iframe>
                        </div>
                        <p className="text-sm text-muted-foreground">{course.videoTitle}</p>
                      </div>

                      {/* Key Outcomes */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">🎯 Key Learning Outcomes</h4>
                        <ul className="space-y-2">
                          {course.keyOutcomes.map((outcome, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                              {outcome}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
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