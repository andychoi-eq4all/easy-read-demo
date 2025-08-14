import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import TestPage from "@/pages/TestPage";
import NotFound from "@/pages/not-found";
import { SimplificationProvider } from "./contexts/SimplificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function Router() {
  return (
    <Switch>
      <Route path="/test" component={TestPage} />
      <Route path="/">
        <SimplificationProvider>
          <Home />
        </SimplificationProvider>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Toaster />
        <Router />
      </div>
    </ThemeProvider>
  );
}

export default App;
