
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        className="text-foreground hover:text-primary transition-colors duration-200"
      >
        Home
      </Link>
      {user && (
        <>
          <Link
            to="/services"
            className="text-foreground hover:text-primary transition-colors duration-200"
          >
            Services
          </Link>
          <Link
            to="/reviews"
            className="text-foreground hover:text-primary transition-colors duration-200"
          >
            Reviews
          </Link>
          <Link
            to="/pricing"
            className="text-foreground hover:text-primary transition-colors duration-200"
          >
            Pricing
          </Link>
          <Link
            to="/contact"
            className="text-foreground hover:text-primary transition-colors duration-200"
          >
            Contact
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-primary animate-fade-in"
          >
            College Sarthi
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                }
                className="transition-transform duration-200"
              />
              <Moon className="h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>
            {user ? (
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            ) : (
              <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary-dark text-primary-foreground">
                Get Started
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[385px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                    />
                    <Moon className="h-4 w-4" />
                  </div>
                  {user ? (
                    <Button onClick={handleSignOut} variant="outline">
                      Sign Out
                    </Button>
                  ) : (
                    <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary-dark text-primary-foreground">
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
