
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { TelegramPopup } from "@/components/TelegramPopup";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Services from "./pages/Services";
import Reviews from "./pages/Reviews";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import Courses from "./pages/Courses";
import Upskiller from "./pages/Upskiller";
import OnlineCollege from "./pages/OnlineCollege";
import GroupDetails from "./pages/GroupDetails";
import GroupNotFound from "./pages/GroupNotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <TelegramPopup />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route 
                path="/courses" 
                element={
                  <ProtectedRoute>
                    <Courses />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/services" 
                element={
                  <ProtectedRoute>
                    <Services />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reviews" 
                element={
                  <ProtectedRoute>
                    <Reviews />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/pricing" 
                element={
                  <ProtectedRoute>
                    <Pricing />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/contact" 
                element={
                  <ProtectedRoute>
                    <Contact />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/resources" 
                element={
                  <ProtectedRoute>
                    <Resources />
                  </ProtectedRoute>
                } 
              />
              <Route path="/upskiller" element={<Upskiller />} />
              <Route 
                path="/online-college" 
                element={
                  <ProtectedRoute>
                    <OnlineCollege />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/online-college/group/:groupId" 
                element={
                  <ProtectedRoute>
                    <GroupDetails />
                  </ProtectedRoute>
                } 
              />
              <Route path="/group-not-found" element={<GroupNotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
