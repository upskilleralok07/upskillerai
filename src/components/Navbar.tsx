
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, X, BookOpen, UserCircle } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({
        title: "Signed out successfully",
        description: "Come back soon!",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: error.message,
      });
    }
  };

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className="text-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-1"
      >
        <span>Home</span>
      </Link>
      {user && (
        <>
          <Link
            to="/services"
            className="text-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-1"
          >
            <span>Services</span>
          </Link>
          <Link
            to="/reviews"
            className="text-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-1"
          >
            <span>Reviews</span>
          </Link>
          <Link
            to="/pricing"
            className="text-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-1"
          >
            <span>Pricing</span>
          </Link>
          <Link
            to="/contact"
            className="text-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-1"
          >
            <span>Contact</span>
          </Link>
          <Link
            to="/resources"
            className="text-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-1"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            <span>Resources</span>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-primary hover:opacity-90 transition-opacity animate-fade-in flex items-center"
          >
            <span className="gradient-text">College Sarthi × Upskiller</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <div className="flex items-center space-x-2 bg-background/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Sun className="h-4 w-4 text-amber-500 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="transition-transform duration-200"
              />
              <Moon className="h-4 w-4 text-blue-500 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
            {user ? (
              <div className="flex items-center space-x-3">
                <Button 
                  variant="ghost" 
                  className="p-0 h-8 w-8 rounded-full bg-primary/5"
                  onClick={() => navigate("/resources")}
                >
                  <UserCircle className="h-5 w-5 text-primary" />
                </Button>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="font-medium">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => navigate("/auth")} 
                className="bg-primary hover:bg-primary-dark text-primary-foreground hover-lift transition-all duration-300"
              >
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-[300px]">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="space-y-4 flex flex-col">
                    <NavLinks />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    />
                    <Moon className="h-4 w-4 text-blue-500" />
                    <span className="text-sm ml-2 text-foreground/70">{theme === "dark" ? "Dark" : "Light"} Mode</span>
                  </div>
                  {user ? (
                    <Button onClick={handleSignOut} variant="outline" className="w-full">
                      Sign Out
                    </Button>
                  ) : (
                    <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary-dark text-primary-foreground w-full">
                      Get Started
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
