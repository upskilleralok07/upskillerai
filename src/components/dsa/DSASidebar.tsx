import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BookOpen, Target, Trophy, BarChart3, 
  Flame, Settings, User, Medal, Clock, Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dsa-patterns' },
  { icon: BookOpen, label: 'Topics', path: '/dsa-patterns#topics' },
  { icon: Target, label: 'Problems', path: '/dsa-patterns#problems' },
  { icon: Trophy, label: 'Leaderboard', path: '/dsa-patterns#leaderboard' },
  { icon: BarChart3, label: 'Analytics', path: '/dsa-patterns#analytics' },
  { icon: Play, label: 'Lectures', path: '/dsa-patterns#lectures' },
];

interface DSASidebarProps {
  className?: string;
}

const DSASidebar = ({ className }: DSASidebarProps) => {
  const location = useLocation();

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40 hidden lg:flex flex-col",
      "bg-gradient-to-b from-card via-card to-background",
      className
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-red-600 flex items-center justify-center red-glow-sm">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-foreground text-lg">DSA Pro</h1>
            <p className="text-xs text-muted-foreground">Master Coding</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (location.hash && item.path.includes(location.hash));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                "hover:bg-primary/10 hover:text-primary",
                isActive && "bg-primary/10 text-primary border border-primary/20 red-glow-sm"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Streak Widget */}
      <div className="p-4 border-t border-border/50">
        <div className="premium-card p-4 red-border-glow">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-500 flex items-center justify-center animate-flame">
              <Flame className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold gradient-text-fire">7 Days</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            🔥 Keep going! 3 more days to beat your record
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Guest User</p>
            <p className="text-xs text-muted-foreground">Level 5 • 1,250 XP</p>
          </div>
          <Settings className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
        </div>
      </div>
    </aside>
  );
};

export default DSASidebar;
