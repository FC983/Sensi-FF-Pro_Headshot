import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PhonesList from "@/pages/phones-list";
import PhoneDetail from "@/pages/phone-detail";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/phones" component={PhonesList} />
      <Route path="/phones/:id" component={PhoneDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div dir="rtl" className="min-h-screen bg-background text-foreground">
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
