import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Manifest from "./pages/Manifest";
import Pojmovnik from "./pages/Pojmovnik";
import Etika from "./pages/Etika";
import Kamni from "./pages/Kamni";
import Stotnije from "./pages/Stotnije";
import ConceptDetail from "./pages/ConceptDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/manifest" element={<Manifest />} />
          <Route path="/pojmovnik" element={<Pojmovnik />} />
          <Route path="/pojmovnik/:slug" element={<ConceptDetail />} />
          <Route path="/etika" element={<Etika />} />
          <Route path="/kamni" element={<Kamni />} />
          <Route path="/stotnije" element={<Stotnije />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
