import DSAPatterns from "./pages/DSAPatterns";
import PatternDetail from "./pages/PatternDetail";
import GenAICourse from "./pages/GenAICourse";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TelegramPopup } from "@/components/TelegramPopup";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

// College Sarthi pages
import CollegeSarthiServices from "./pages/CollegeSarthiServices";
import CollegeSarthiReviews from "./pages/CollegeSarthiReviews";
import CollegeSarthiResources from "./pages/CollegeSarthiResources";
import CollegeSarthiContact from "./pages/CollegeSarthiContact";

// Upskiller pages
import UpskillerCourses from "./pages/UpskillerCourses";
import UpskillerResources from "./pages/UpskillerResources";
import UpskillerContact from "./pages/UpskillerContact";

// Shared/existing pages
import OnlineCollege from "./pages/OnlineCollege";
import GroupDetails from "./pages/GroupDetails";
import GroupNotFound from "./pages/GroupNotFound";
import Courses from "./pages/Courses";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <TelegramPopup />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />

              {/* College Sarthi Routes */}
              <Route path="/college-sarthi/services" element={<CollegeSarthiServices />} />
              <Route path="/college-sarthi/reviews" element={<CollegeSarthiReviews />} />
              <Route path="/college-sarthi/resources" element={<ProtectedRoute><CollegeSarthiResources /></ProtectedRoute>} />
              <Route path="/college-sarthi/contact" element={<CollegeSarthiContact />} />

              {/* Upskiller Routes */}
              <Route path="/upskiller/courses" element={<UpskillerCourses />} />
              <Route path="/upskiller/resources" element={<UpskillerResources />} />
              <Route path="/upskiller/contact" element={<UpskillerContact />} />

              {/* Shared Course Routes */}
              <Route path="/dsa-patterns" element={<DSAPatterns />} />
              <Route path="/dsa-patterns/:patternId" element={<PatternDetail />} />
              <Route path="/genai-course" element={<GenAICourse />} />
              <Route path="/online-college" element={<ProtectedRoute><OnlineCollege /></ProtectedRoute>} />
              <Route path="/online-college/group/:groupId" element={<ProtectedRoute><GroupDetails /></ProtectedRoute>} />
              <Route path="/group/:inviteCode" element={<ProtectedRoute><GroupDetails /></ProtectedRoute>} />
              <Route path="/group-not-found" element={<GroupNotFound />} />

              {/* Legacy redirects */}
              <Route path="/services" element={<Navigate to="/college-sarthi/services" replace />} />
              <Route path="/reviews" element={<Navigate to="/college-sarthi/reviews" replace />} />
              <Route path="/resources" element={<Navigate to="/college-sarthi/resources" replace />} />
              <Route path="/contact" element={<Navigate to="/college-sarthi/contact" replace />} />
              <Route path="/courses" element={<Navigate to="/upskiller/courses" replace />} />
              <Route path="/upskiller" element={<Navigate to="/upskiller/courses" replace />} />
              <Route path="/pricing" element={<Navigate to="/college-sarthi/services" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
