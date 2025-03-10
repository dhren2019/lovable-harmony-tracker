
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientDetail from "./pages/ClientDetail";
import RequireAuth from "./components/auth/RequireAuth";
import { ClientProvider } from "./contexts/ClientContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ClientProvider>
        <Toaster />
        <Sonner />
        <RequireAuth>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/client/:clientId" element={<ClientDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </RequireAuth>
      </ClientProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
