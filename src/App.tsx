import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuizProvider } from "@/contexts/QuizContext";
import GlobalQuiz from "@/components/quiz/GlobalQuiz";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TemplatePreview from "./pages/TemplatePreview";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import QuizPreview from "./pages/QuizPreview";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AdminLeadDetail from "./pages/AdminLeadDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <QuizProvider>
        <Toaster />
        <Sonner />
        <GlobalQuiz />
        <BrowserRouter>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none"
          >
            Skip to main content
          </a>
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/template-preview" element={<TemplatePreview />} />
            <Route path="/quiz-preview" element={<QuizPreview />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/lead/:id" element={<AdminLeadDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QuizProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
