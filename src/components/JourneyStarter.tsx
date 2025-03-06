
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ResourcesPopup } from './ResourcesPopup';
import { ArrowRight, BookOpen, Calendar, GraduationCap, LogIn, Send, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface JourneyStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: () => void;
  actionText?: string;
}

const JourneyStep = ({ icon, title, description, action, actionText = "Continue" }: JourneyStepProps) => (
  <div className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:border-primary/50 transition-all bg-card hover-lift">
    <div className="bg-primary/10 p-3 rounded-full">
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-lg mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm mb-3">{description}</p>
      {action && (
        <Button variant="outline" size="sm" onClick={action} className="hover:bg-primary/10">
          {actionText} <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      )}
    </div>
  </div>
);

export function JourneyStarter({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAuthenticate = () => {
    setJourneyOpen(false);
    navigate('/auth');
  };

  const handleExploreResources = () => {
    setResourcesOpen(true);
  };

  const handleRankAnalysis = () => {
    if (user) {
      navigate('/services');
    } else {
      handleAuthenticate();
    }
  };

  const handleBookConsultation = () => {
    if (user) {
      navigate('/contact');
    } else {
      handleAuthenticate();
    }
  };

  return (
    <>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl gradient-text flex items-center justify-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Start Your Journey
          </DialogTitle>
          <DialogDescription>
            Let's help you find the right path to your dream college
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <JourneyStep 
            icon={<Send className="h-5 w-5 text-primary" />}
            title="Get JEE Rank Analysis"
            description="Let our experts analyze your JEE rank and recommend suitable colleges."
            action={handleRankAnalysis}
            actionText="Analyze Rank"
          />
          
          <JourneyStep 
            icon={<Calendar className="h-5 w-5 text-primary" />}
            title="Book College Counseling"
            description="Schedule a one-on-one session with our experienced counselors."
            action={handleBookConsultation}
            actionText="Book Session"
          />
        </div>
        
        <DialogFooter className="flex-col gap-3 sm:gap-0">
          {!user && (
            <div className="w-full flex flex-col space-y-3">
              <Button 
                onClick={handleAuthenticate} 
                className="w-full group bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg transition-all duration-300 py-6"
              >
                <UserPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Sign Up</span>
                <span className="ml-1 text-white/80 text-sm">for Personalized Help</span>
              </Button>
              
              <div className="flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Already have an account?</span>
                <Button 
                  variant="ghost" 
                  onClick={handleAuthenticate} 
                  className="text-primary hover:text-primary-dark underline-offset-4 hover:underline ml-1 px-2"
                >
                  <LogIn className="mr-1 h-4 w-4" /> Sign In
                </Button>
              </div>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
      <ResourcesPopup isOpen={resourcesOpen} onOpenChange={setResourcesOpen} />
    </>
  );
}

export function JourneyStarterButton() {
  return (
    <Dialog>
      <JourneyStarter>
        <Button className="inline-flex items-center bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg text-lg font-medium transition-all duration-200 animate-slide-in hover-lift">
          Start Your Journey
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </JourneyStarter>
    </Dialog>
  );
}
