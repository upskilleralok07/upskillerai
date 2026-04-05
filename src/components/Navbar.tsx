
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, GraduationCap, Rocket, BookOpen, UserCircle, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({ title: "Signed out successfully", description: "Come back soon!" });
      navigate("/");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error signing out", description: error.message });
    }
  };

  const isCollegeSarthi = location.pathname.startsWith("/college-sarthi");
  const isUpskiller = location.pathname.startsWith("/upskiller") || location.pathname.startsWith("/dsa") || location.pathname.startsWith("/genai") || location.pathname.startsWith("/online-college");

  const collegeSarthiLinks = [
    { to: "/college-sarthi/services", label: "Services" },
    { to: "/college-sarthi/reviews", label: "College Reviews" },
    { to: "/college-sarthi/resources", label: "Resources" },
    { to: "/college-sarthi/contact", label: "Contact" },
  ];

  const upskillerLinks = [
    { to: "/upskiller/courses", label: "Courses" },
    { to: "/online-college", label: "Online College" },
    { to: "/upskiller/resources", label: "Resources" },
    { to: "/upskiller/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-lg shadow-md" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl md:text-2xl font-bold text-primary hover:opacity-90 transition-opacity flex items-center">
            <span className="gradient-text">College Sarthi × Upskiller</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors text-sm font-medium">Home</Link>

            {/* College Sarthi Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isCollegeSarthi ? "text-primary" : "text-foreground"}`}>
                <GraduationCap className="w-4 h-4" />
                College Sarthi
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {collegeSarthiLinks.map(link => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link to={link.to} className="cursor-pointer">{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Upskiller Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isUpskiller ? "text-primary" : "text-foreground"}`}>
                <Rocket className="w-4 h-4" />
                Upskiller
                <ChevronDown className="w-3 h-3" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {upskillerLinks.map(link => (
                  <DropdownMenuItem key={link.to} asChild>
                    <Link to={link.to} className="cursor-pointer">{link.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center space-x-2 bg-background/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Sun className="h-4 w-4 text-amber-500 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Switch checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")} />
              <Moon className="h-4 w-4 text-blue-500 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" className="p-0 h-8 w-8 rounded-full bg-primary/5" onClick={() => navigate("/college-sarthi/resources")}>
                  <UserCircle className="h-5 w-5 text-primary" />
                </Button>
                <Button onClick={handleSignOut} variant="outline" size="sm">Sign Out</Button>
              </div>
            ) : (
              <Button onClick={() => navigate("/auth")} className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon"><Menu className="h-6 w-6" /></Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-[300px]">
                <div className="flex flex-col space-y-6 mt-8">
                  <Link to="/" className="text-foreground hover:text-primary font-medium">Home</Link>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" /> College Sarthi
                    </p>
                    <div className="space-y-2 pl-4">
                      {collegeSarthiLinks.map(link => (
                        <Link key={link.to} to={link.to} className="block text-foreground hover:text-primary text-sm">{link.label}</Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                      <Rocket className="w-3 h-3" /> Upskiller
                    </p>
                    <div className="space-y-2 pl-4">
                      {upskillerLinks.map(link => (
                        <Link key={link.to} to={link.to} className="block text-foreground hover:text-primary text-sm">{link.label}</Link>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4 text-amber-500" />
                    <Switch checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")} />
                    <Moon className="h-4 w-4 text-blue-500" />
                    <span className="text-sm ml-2 text-muted-foreground">{theme === "dark" ? "Dark" : "Light"} Mode</span>
                  </div>

                  {user ? (
                    <Button onClick={handleSignOut} variant="outline" className="w-full">Sign Out</Button>
                  ) : (
                    <Button onClick={() => navigate("/auth")} className="w-full">Get Started</Button>
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
