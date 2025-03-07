
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
import { ArrowRight, Calendar, GraduationCap, LogIn, Send, UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function JourneyStarterButton() {
  return (
    <Dialog>
      <JourneyStarter>
        <Button className="bg-gradient-to-r from-primary to-primary-dark text-white px-8 py-6 rounded-lg text-lg font-medium transition-all duration-300 animate-slide-in hover-lift cursor-pointer shadow-md">
          Start Your Journey
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </JourneyStarter>
    </Dialog>
  );
}

export function JourneyStarter({ children }: { children: React.ReactNode }) {
  const [journeyOption, setJourneyOption] = useState<string | null>(null);
  const [journeyOpen, setJourneyOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAuthenticate = () => {
    setJourneyOpen(false);
    navigate('/auth');
  };

  const selectOption = (option: string) => {
    setJourneyOption(option);
    if (user) {
      if (option === 'rank') {
        navigate('/services');
      } else if (option === 'counseling') {
        navigate('/contact');
      }
    }
  };

  const resetOptions = () => {
    setJourneyOption(null);
  };

  return (
    <>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md backdrop-blur-xl bg-white/90 dark:bg-background/80 border-primary/20 shadow-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl gradient-text flex items-center justify-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Start Your Journey
          </DialogTitle>
          <DialogDescription>
            Let's help you find the right path to your dream college
          </DialogDescription>
        </DialogHeader>
        
        {!journeyOption ? (
          <div className="space-y-4 my-4">
            <div 
              onClick={() => selectOption('rank')}
              className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:border-primary/50 transition-all bg-white/50 dark:bg-card/50 hover-lift cursor-pointer"
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <Send className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-1">Get JEE Rank Analysis</h3>
                <p className="text-muted-foreground text-sm mb-3">Let our experts analyze your JEE rank and recommend suitable colleges.</p>
              </div>
            </div>
            
            <div 
              onClick={() => selectOption('counseling')}
              className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:border-primary/50 transition-all bg-white/50 dark:bg-card/50 hover-lift cursor-pointer"
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-lg mb-1">Book College Counseling</h3>
                <p className="text-muted-foreground text-sm mb-3">Schedule a one-on-one session with our experienced counselors.</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col space-y-6 py-6 px-2">
            <div className="text-center mb-2">
              <h3 className="text-lg font-medium gradient-text">
                {journeyOption === 'rank' ? 'Sign Up for Rank Analysis' : 'Sign Up for College Counseling'}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">Create an account to continue</p>
            </div>
            
            <Button 
              onClick={handleAuthenticate} 
              className="w-full group bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg transition-all duration-300 py-6 cursor-pointer backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/20"
            >
              <UserPlus className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Sign Up</span>
              <span className="ml-1 text-white/80 text-sm">for Personalized Help</span>
            </Button>
            
            <div className="relative flex items-center justify-center my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative px-3 text-xs uppercase text-muted-foreground bg-card">Or</div>
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleAuthenticate} 
              className="w-full flex items-center justify-center gap-2 py-5 border border-primary/20 hover:bg-primary/5 cursor-pointer"
            >
              <LogIn className="h-4 w-4 text-primary" /> 
              <span>Sign In to Your Account</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetOptions} 
              className="mx-auto mt-2 text-primary hover:text-primary-dark cursor-pointer"
            >
              Go Back
            </Button>
          </div>
        )}
      </DialogContent>
    </>
  );
}
