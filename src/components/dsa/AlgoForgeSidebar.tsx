import { Link, useLocation } from 'react-router-dom';
import { 
  Home, BookOpen, Target, Trophy, BarChart3, 
  Flame, Settings, User, Play, Zap, ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDSAProgress } from '@/hooks/useDSAProgress';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/dsa-patterns' },
  { icon: BookOpen, label: 'Topics', path: '/dsa-patterns#topics' },
  { icon: Zap, label: 'Patterns', path: '/dsa-patterns#patterns' },
  { icon: Trophy, label: 'Leaderboard', path: '/dsa-patterns#leaderboard' },
  { icon: BarChart3, label: 'Analytics', path: '/dsa-patterns#analytics' },
  { icon: Play, label: 'Live Lectures', path: '/dsa-patterns#lectures' },
];

interface AlgoForgeSidebarProps {
  className?: string;
}

const AlgoForgeSidebar = ({ className }: AlgoForgeSidebarProps) => {
  const location = useLocation();
  const { progress } = useDSAProgress();
  const { user } = useAuth();

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Guest User';
  const xpProgress = (progress.xp % 100);

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40 hidden lg:flex flex-col",
      "bg-gradient-to-b from-card via-card to-background",
      className
    )}>
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <Link to="/dsa-patterns" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-red-600 flex items-center justify-center red-glow-sm">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-foreground text-lg">AlgoForge</h1>
            <p className="text-xs text-muted-foreground">Master DSA</p>
          </div>
        </Link>
      </div>

      {/* Course Selector Dropdown */}
      <div className="p-4 border-b border-border/50">
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors text-left">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Select Course</span>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuItem asChild>
              <Link to="/dsa-patterns#topics" className="flex items-center gap-2 cursor-pointer">
                <BookOpen className="w-4 h-4" />
                <div>
                  <p className="font-medium">Topic-wise Practice</p>
                  <p className="text-xs text-muted-foreground">13 topics, 145+ problems</p>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dsa-patterns#patterns" className="flex items-center gap-2 cursor-pointer">
                <Zap className="w-4 h-4" />
                <div>
                  <p className="font-medium">Pattern-wise Practice</p>
                  <p className="text-xs text-muted-foreground">30 patterns, 400+ problems</p>
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
              <p className="text-2xl font-bold gradient-text-fire">{progress.streak.current} Days</p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            🔥 {progress.streak.current > 0 
              ? `${Math.max(0, progress.streak.longest - progress.streak.current)} more days to beat your record!` 
              : 'Solve a problem to start your streak!'}
          </div>
        </div>
      </div>

      {/* User Profile with accurate data */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center">
            {user ? (
              <span className="text-sm font-bold text-primary">
                {displayName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </span>
            ) : (
              <User className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{displayName}</p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">Level {progress.level}</span>
              <span className="text-xs text-primary">• {progress.xp} XP</span>
            </div>
            {/* XP Progress Bar */}
            <div className="w-full bg-muted rounded-full h-1 mt-1">
              <div 
                className="h-1 bg-gradient-to-r from-primary to-streak rounded-full transition-all"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
          <Settings className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
        </div>
      </div>
    </aside>
  );
};

export default AlgoForgeSidebar;
